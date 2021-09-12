/* eslint "ts-immutable/immutable-data": [ "error", { "ignorePattern": "this" } ] */

import { Either } from 'src/fp/Either';
import { NoRouteFoundException } from 'src/errors/routing/NoRouteFoundException';
import { MethodNotAllowedException } from 'src/errors/routing/MethodNotAllowedException';
import { MalformedPathException } from 'src/errors/routing/MalformedPathException';
import { DuplicateRouteException } from 'src/errors/routing/DuplicateRouteException';
import { ParseRouteSegmentData } from 'src/web/routing/internal/ParseRouteSegmentData';
import { ParseRouteReturnType } from 'src/web/routing/internal/ParseRouteReturnType';
import { RoutingOptions } from 'src/web/routing/RoutingOptions';
import { GenericRoute } from 'src/web/routing/Route';
import { regexLastIndexOf } from 'src/util/regexpLastIndexOf';
import { regExpNonEscapedLeftBracket } from 'src/web/routing/internal/regExpNonEscapedLeftBracket';
import { regExpNonEscapedRightBracket } from 'src/web/routing/internal/regExpNonEscapedRightBracket';
import { InvalidParamException, UnmatchedParamTypes } from 'src/errors/routing/InvalidParamException';
import { MultipleRoutesMatchException } from 'src/errors/routing/MultipleRoutesMatchException';
import { TypeValidationException } from 'src/errors/TypeValidationException';

type MethodMap = {
  [method: string]: GenericRoute[];
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
  protected methodMap: MethodMap = {};

  protected literalPathsTable: RoutingTable = {};
  protected literalPathsKeysSorted: string[] = [];

  protected paramsPathsTable: ParamRoutingTable = {};
  protected paramsPathsPrefixKeysSorted: string[] = [];
  protected paramsPathsPostfixKeysSorted: Record<string, string[]> = {};

  protected keysExtracted = true;

  constructor(protected readonly options: RoutingOptions) {}

  /**
   * Prepare the `this.*KeysSorted` variables.
   */
  protected extractKeys() {
    if (this.keysExtracted) {
      return;
    }
    this.keysExtracted = true;

    const getObjectKeysSorted = (object: Record<string, unknown>) =>
      Object.keys(object).sort((a, b) => b.length - a.length); //eslint-disable-line ts-immutable/immutable-data

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
      if (Object.keys(this.methodMap).length === 0) {
        return Either.Left(new NoRouteFoundException());
      }

      if (this.methodMap[data.method] === undefined || this.methodMap[data.method].length === 0) {
        return Either.Left(new MethodNotAllowedException(data.method, Object.keys(this.methodMap)));
      }

      let routesToCheck = this.methodMap[data.method];

      let errors: UnmatchedParamTypes = [];
      for (let i = 0; i < data.pathVariables.length; i++) {
        const variableValue = data.pathVariables[i];

        for (const route of routesToCheck) {
          const pathParamName = route.pathParams[i];
          const type = route.pathParamTypes[pathParamName];
          const validationResult = type.validateValue(variableValue);

          if (validationResult.isLeft()) {
            errors = [
              ...errors,
              { route, paramErrors: {[pathParamName]: validationResult.value}}
            ];
            routesToCheck = routesToCheck.filter(r => r !== route);
          }
        }
        if (routesToCheck.length === 0) {
          return Either.Left(new InvalidParamException('path', data.rawPath, variableValue, errors));
        } else {
          errors = [];
        }
      }

      if (routesToCheck.length === 1) {
        return Either.Right(routesToCheck[0]);
      }

      type ParamValidator<T extends string> = ['query' | 'headers' | 'cookies' | 'body', Record<T, string>, (r: GenericRoute) => Partial<Record<T, TypeValidationException>>];
      const paramValidators: Array<ParamValidator<string>> = [
        ['query', data.query, (r: GenericRoute) => r.queryMatchErrors(data.query)],
        ['headers', data.headers, (r: GenericRoute) => r.headersMatchErrors(data.headers)],
        ['cookies', data.cookies, (r: GenericRoute) => r.cookiesMatchErrors(data.cookies)],
        ['body', {body: data.rawBody}, (r: GenericRoute) => {
          if (r.requiresBody && data.rawBody === '') {
            return {body: new TypeValidationException('body', 'non-empty string')};
          } else if (!r.requiresBody && data.rawBody !== '') {
            return {body: new TypeValidationException('body', 'empty')};
          }
          return {};
        } ],
      ];
      const hasErrors = (validationResult: Partial<Record<string, TypeValidationException>>): validationResult is Record<string, TypeValidationException> => Object.keys(validationResult).length !== 0;
      for (const [type, variables, validationFn] of paramValidators) {
        errors = [];

        for (const route of routesToCheck) {
          const validationResult = validationFn(route);
          if (hasErrors(validationResult)) {
            errors = [
              ...errors,
              { route, paramErrors: validationResult}
            ];
            routesToCheck = routesToCheck.filter(r => r !== route);
          }
        }

        if (routesToCheck.length === 0) {
          return Either.Left(new InvalidParamException(type, data.rawPath, variables, errors));
        }

        if (routesToCheck.length === 1) {
          return Either.Right(routesToCheck[0]);
        }
      }

      return Either.Left(new MultipleRoutesMatchException(routesToCheck, data.method, data.rawPath));
    }

    const pathSegment = data.pathSegments[data.pathSegmentIndex];
    data = {
      ...data,
      pathSegmentIndex: data.pathSegmentIndex + 1,
    };

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
            data = {
              ...data,
              pathVariables: [...data.pathVariables, param],
            };

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
    pathSegments: string[],
    route: GenericRoute
  ): Either<MalformedPathException | DuplicateRouteException, undefined> {
    const path = route.path;

    const [pathSegment, ...nextPathSegments] = pathSegments;

    const startParam = pathSegment.search(regExpNonEscapedLeftBracket);
    const endParam = regexLastIndexOf(pathSegment, regExpNonEscapedRightBracket);

    let next: RoutingSegment;
    if (startParam < 0 && endParam < 0) {
      //there is no parameter in this segment
      next = this.addLiteralRouteSegment(pathSegment);
    } else if (startParam >= 0 && endParam < 0) {
      return Either.Left(
        new MalformedPathException(
          "there is a '{' but not a '}'. Consider escaping the bracket by replacing '{' with '\\{'",
          path,
          pathSegment
        )
      );
    } else if (startParam < 0 && endParam >= 0) {
      return Either.Left(
        new MalformedPathException(
          "there is a '}' but not a '{'. Consider escaping the bracket by replacing '}' with '\\}'",
          path,
          pathSegment
        )
      );
    } else if (pathSegment.split(regExpNonEscapedLeftBracket).length !== 1) {
      return Either.Left(
        new MalformedPathException('each path segment may only contain one parameter.', path, pathSegment)
      );
    } else {
      //contains a parameter
      const prefix = pathSegment.substring(0, startParam);
      const postfix = pathSegment.substr(endParam + 1);
      next = this.addPathRouteSegment(prefix, postfix);
    }
    if (nextPathSegments.length > 0) {
      return next.addRouteSegment(nextPathSegments, route);
    }
    return next.addRoute(route);
  }

  /**
   * Get or create a `RoutingSegment` object for the given `pathSegment` literal.
   */
  private addLiteralRouteSegment(pathSegment: string): RoutingSegment {
    pathSegment = this.normalizePathLiteral(pathSegment);

    if (this.literalPathsTable[pathSegment] === undefined) {
      this.literalPathsTable[pathSegment] = new RoutingSegment(this.options);
      this.keysExtracted = false;
    }
    return this.literalPathsTable[pathSegment];
  }

  /**
   * Get or create a `RoutingSegment` object for the given parameter objects.
   */
  protected addPathRouteSegment(prefix: string, postfix: string): RoutingSegment {
    prefix = this.normalizePathLiteral(prefix);
    postfix = this.normalizePathLiteral(postfix);

    if (this.paramsPathsTable[prefix] === undefined) {
      this.paramsPathsTable[prefix] = {};
      this.keysExtracted = false;
    }

    if (this.paramsPathsTable[prefix][postfix] === undefined) {
      this.paramsPathsTable[prefix][postfix] = new RoutingSegment(this.options);
      this.keysExtracted = false;
    }

    return this.paramsPathsTable[prefix][postfix];
  }

  protected normalizePathLiteral(pathSegment: string): string {
    if (this.options.ignoreCase) {
      pathSegment = pathSegment.toLowerCase();
    }

    return pathSegment.replace(regExpNonEscapedLeftBracket, '{').replace(regExpNonEscapedRightBracket, '}');
  }

  /**
   * Add a handler to this `RoutingSegment` object.
   */
  public addRoute(route: GenericRoute): Either<DuplicateRouteException, undefined> {
    const method = route.method;

    if (this.methodMap[method] === undefined || this.methodMap[method].length === 0) {
      this.methodMap[method] = [route];
      return Either.Right(undefined);
    }

    let duplicateFound: false | GenericRoute = false;
    if (route.pathParams.length === 0) {
      //is literal path (without parameters)
      duplicateFound = this.methodMap[method][0];
    } else {
      //check for duplicate param types
      const pathParamTypes = route.pathParams.map(param => route.pathParamTypes[param]);
      pathParamTypesLoop: for (let index = 0; index < pathParamTypes.length; index++) {
        const type = pathParamTypes[index];
        for (const otherRoute of this.methodMap[method]) {
          const comparisonType = otherRoute[otherRoute.pathParams[index]];
          if (type === comparisonType) {
            duplicateFound = otherRoute;
            break pathParamTypesLoop;
          }
        }
      }
    }

    if (duplicateFound === false) {
      this.methodMap[method] = [...this.methodMap[method], route];
      return Either.Right(undefined);
    }

    return Either.Left(new DuplicateRouteException(route, duplicateFound));
  }
}
