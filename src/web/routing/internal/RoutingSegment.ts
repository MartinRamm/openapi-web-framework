/* eslint-disable ts-immutable/immutable-data */

import { Handler } from 'src/web/Handler';
import { Either } from 'src/fp/Either';
import { NoRouteFoundException } from 'src/errors/routing/NoRouteFoundException';
import { MethodNotAllowedException } from 'src/errors/routing/MethodNotAllowedException';
import { MalformedPathException } from 'src/errors/routing/MalformedPathException';
import { DuplicateRouteException } from 'src/errors/routing/DuplicateRouteException';
import { ParseRouteSegmentData } from 'src/web/routing/internal/ParseRouteSegmentData';
import { ParseRouteReturnType } from 'src/web/routing/internal/ParseRouteReturnType';

type HandlersMap = {
  [method: string]: Handler;
};

type RoutingTable = {
  [literal: string]: RoutingSegment;
};

type ParamRoutingTable = {
  [prefix: string]: {
    [postfix: string]: RoutingSegment;
  };
};

//TODO add logging
/**
 * A routing segment represents the possibilities one path segment (the part between `/`) can have. These are grouped
 * into:
 *    * literalPaths --> path segments without parameters, e.g.: `new`
 *    * paramPaths --> path segments that contain a parameter. This may contain:
 *        * param with prefix and postfix, e.g.: `prefix-{param}-postfix`
 *        * param with prefix, e.g.: `prefix-{param}`
 *        * param with postfix, e.g.: `{param}-postfix`
 *        * param without any pre/postfixes, e.g.: `{param}`
 */
export class RoutingSegment {
  private handlers: HandlersMap = {};

  private literalPathsTable: RoutingTable = {};
  private literalPathsKeysSorted: string[] = [];

  private paramsPathsTable: ParamRoutingTable = {};
  private paramsPathsPrefixKeysSorted: string[] = [];
  private paramsPathsPostfixKeysSorted: Record<string, string[]> = {};

  private keysExtracted = true;

  /**
   * Prepare the `this.*KeysSorted` variables.
   */
  private extractKeys() {
    if (this.keysExtracted) {
      return;
    }
    this.keysExtracted = true;

    const getObjectKeysSorted = (object: Record<string, unknown>) =>
      Object.keys(object).sort((a, b) => b.length - a.length);

    this.literalPathsKeysSorted = getObjectKeysSorted(this.literalPathsTable);

    this.paramsPathsPrefixKeysSorted = getObjectKeysSorted(this.paramsPathsTable);
    this.paramsPathsPrefixKeysSorted.forEach(prefix => {
      const postfixes = getObjectKeysSorted(this.paramsPathsTable[prefix]);
      this.paramsPathsPostfixKeysSorted[prefix] = postfixes;
    });
  }

  /**
   * Parse a path segment.
   */
  public parseRouteSegment(data: ParseRouteSegmentData): ParseRouteReturnType {
    this.extractKeys();

    if (data.pathSegmentIndex >= data.pathSegments.length) {
      if (Object.keys(this.handlers).length === 0) {
        return Either.Left(new NoRouteFoundException());
      }

      if (this.handlers[data.method] === undefined) {
        return Either.Left(new MethodNotAllowedException(data.method, Object.keys(this.handlers)));
      }
      return Either.Right(this.handlers[data.method]);
    }

    const pathSegment = data.pathSegments[data.pathSegmentIndex];
    data.pathSegmentIndex++;

    if (pathSegment === '') {
      return this.parseRouteSegment(data);
    }

    for (const literal of this.literalPathsKeysSorted) {
      if (literal === pathSegment) {
        return this.literalPathsTable[pathSegment].parseRouteSegment(data);
      }
    }

    for (const prefix of this.paramsPathsPrefixKeysSorted) {
      if (pathSegment.startsWith(prefix)) {
        for (const postfix of this.paramsPathsPostfixKeysSorted[prefix]) {
          if (pathSegment.length > prefix.length + postfix.length && pathSegment.endsWith(postfix)) {
            const param = pathSegment.substring(prefix.length, pathSegment.length - postfix.length);
            data.pathVariables.push(param);

            return this.paramsPathsTable[prefix][postfix].parseRouteSegment(data);
          }
        }
      }
    }

    return Either.Left(new NoRouteFoundException());
  }

  /**
   * Add a handler for the next route segment.
   */
  public addRouteSegment(
    method: string,
    path: string,
    pathSegments: string[],
    handler: Handler,
    ignoreCase: boolean
  ): Either<MalformedPathException | DuplicateRouteException, undefined> {
    const [pathSegment, ...nextPathSegments] = pathSegments;

    const startParam = pathSegment.indexOf('{');
    const endParam = pathSegment.lastIndexOf('}');

    let next: RoutingSegment;
    if (startParam < 0 && endParam < 0) {
      //there is no parameter in this segment
      next = this.addLiteralRouteSegment(pathSegment, ignoreCase);
    } else if ((startParam >= 0 && endParam < 0) || (startParam < 0 && endParam >= 0)) {
      //there is a '{' but not a '}' or vise versa
      return Either.Left(new MalformedPathException(path, pathSegment));
    } else {
      //contains a parameter
      const paramName = pathSegment.substring(startParam + 1, endParam);
      if (paramName.indexOf('{') >= 0 || paramName.indexOf('}') >= 0) {
        //contains multiple parameters
        return Either.Left(new MalformedPathException(path, pathSegment));
      }
      const prefix = pathSegment.substring(0, startParam);
      const postfix = pathSegment.substr(endParam + 1);
      next = this.addPathRouteSegment(prefix, postfix, ignoreCase);
    }
    if (nextPathSegments.length > 0) {
      return next.addRouteSegment(method, path, nextPathSegments, handler, ignoreCase);
    }
    return next.addHandler(method, handler);
  }

  /**
   * Get or create a `RoutingSegment` object for the given `pathSegment` literal.
   */
  private addLiteralRouteSegment(pathSegment: string, ignoreCase: boolean): RoutingSegment {
    if (ignoreCase) {
      pathSegment = pathSegment.toLowerCase();
    }

    if (this.literalPathsTable[pathSegment] === undefined) {
      this.literalPathsTable[pathSegment] = new RoutingSegment();
      this.keysExtracted = false;
    }
    return this.literalPathsTable[pathSegment];
  }

  /**
   * Get or create a `RoutingSegment` object for the given parameter objects.
   */
  private addPathRouteSegment(prefix: string, postfix: string, ignoreCase: boolean): RoutingSegment {
    if (ignoreCase) {
      prefix = prefix.toLowerCase();
      postfix = postfix.toLowerCase();
    }

    if (this.paramsPathsTable[prefix] === undefined) {
      this.paramsPathsTable[prefix] = {};
      this.keysExtracted = false;
    }

    if (this.paramsPathsTable[prefix][postfix] === undefined) {
      this.paramsPathsTable[prefix][postfix] = new RoutingSegment();
      this.keysExtracted = false;
    }

    return this.paramsPathsTable[prefix][postfix];
  }

  /**
   * Add a handler to this `RoutingSegment` object.
   */
  public addHandler(method: string, handler: Handler): Either<DuplicateRouteException, undefined> {
    if (this.handlers[method] !== undefined) {
      return Either.Left(new DuplicateRouteException()); //TODO
    }
    this.handlers[method] = handler;
    return Either.Right(undefined);
  }
}
