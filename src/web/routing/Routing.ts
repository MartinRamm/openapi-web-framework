import { RoutingSegment } from 'src/web/routing/internal/RoutingSegment';
import { Either } from 'src/fp/Either';
import { MalformedUrlException } from 'src/errors/routing/MalformedUrlException';
import { ParseRouteSegmentData } from 'src/web/routing/internal/ParseRouteSegmentData';
import { Handler } from 'src/web/Handler';
import { ParseRouteReturnType } from 'src/web/routing/internal/ParseRouteReturnType';

//TODO add logging
export class Routing {
  private readonly rootSegment = new RoutingSegment();

  /**
   * Parse route for an incoming request.
   */
  public parseRoute(method: string, rawRoute: string, ignoreCase: boolean): ParseRouteReturnType {
    let route = rawRoute;
    try {
      route = decodeURI(route);
    } catch {
      return Either.Left(new MalformedUrlException(route));
    }

    if (ignoreCase) {
      route = route.toLowerCase();
    }

    const queryStringFirstChar = route.indexOf('?');
    const hasQueryString = queryStringFirstChar > 0;

    const path = hasQueryString ? route.substr(0, queryStringFirstChar) : route;

    const data: ParseRouteSegmentData = {
      method,
      pathSegmentIndex: 0,
      pathSegments: path.split('/'),
      pathVariables: [],
      queryString: hasQueryString ? '' : route.substr(queryStringFirstChar),
    };

    return this.rootSegment.parseRouteSegment(data);
  }

  /**
   * Add a handler for a route.
   */
  public addRoute(method: string, path: string, handler: Handler, ignoreCase: boolean) {
    const pathSegments = path.split('/').filter(segment => segment !== '');

    if (pathSegments.length > 0) {
      return this.rootSegment.addRouteSegment(method, path, pathSegments, handler, ignoreCase);
    }
    return this.rootSegment.addHandler(method, handler);
  }
}
