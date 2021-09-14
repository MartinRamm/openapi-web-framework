import { RoutingSegment } from 'src/web/routing/internal/RoutingSegment';
import { Either } from 'src/fp/Either';
import { MalformedUrlException } from 'src/errors/routing/MalformedUrlException';
import { ParseRouteSegmentData } from 'src/web/routing/internal/ParseRouteSegmentData';
import { ParseRouteReturnType } from 'src/web/routing/internal/ParseRouteReturnType';
import { RoutingOptions } from 'src/web/routing/RoutingOptions';
import { GenericRoute } from 'src/web/routing/Route';

//TODO add logging
export class Routing {
  protected readonly rootSegment: RoutingSegment;

  public constructor(protected readonly options: RoutingOptions) {
    this.rootSegment = new RoutingSegment(options);
  }

  /**
   * Parse route for an incoming request.
   */
  public parseRoute(
    method: string,
    rawPath: string,
    rawBody: string,
    query: Record<string, string>,
    headers: Record<string, string>,
    cookies: Record<string, string>
  ): ParseRouteReturnType {
    //decode encoded characters
    let path = rawPath.replace(/%2f/gi, '\\/');
    try {
      path = decodeURI(path);
    } catch {
      return Either.Left(new MalformedUrlException(path));
    }

    if (this.options.ignoreCase) {
      path = path.toLowerCase();
    }

    const data: ParseRouteSegmentData = {
      method,
      rawPath,
      rawBody,
      query,
      headers,
      cookies,
      pathSegmentIndex: 0,
      pathSegments: this.getPathSegments(path),
      pathVariables: [],
    };

    return this.rootSegment.parseRouteSegment(data);
  }

  /**
   * Add a handler for a route.
   */
  public addRoute(route: GenericRoute) {
    const path = route.path;
    const pathSegments = this.getPathSegments(path);

    if (pathSegments.length > 0) {
      return this.rootSegment.addRouteSegment(pathSegments, route);
    }
    return this.rootSegment.addRoute(route);
  }

  protected getPathSegments(path: string): string[] {
    let pathSegments = path.split(/(?<!\\)\//g);

    if (this.options.ignoreMultipleSlashes) {
      pathSegments = pathSegments.filter(segment => segment !== '');
      if (!this.options.ignoreTrailingSlash && path.endsWith('/')) {
        pathSegments = [...pathSegments, ''];
      }
    }

    if (this.options.ignoreTrailingSlash && pathSegments[pathSegments.length - 1] === '') {
      pathSegments = pathSegments.slice(0, pathSegments.length - 1); //remove last element
    }

    return pathSegments;
  }
}
