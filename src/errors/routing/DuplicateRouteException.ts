import { GenericRoute } from 'src/web/routing/Route';

export class DuplicateRouteException extends Error {
  constructor(public readonly routeA: GenericRoute, public readonly routeB: GenericRoute) {
    super(`Duplicate route found: "${routeA.method} ${routeA.path}" and "${routeB.method} ${routeB.path}"`);
  }
}
