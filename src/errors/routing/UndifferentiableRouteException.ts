import { GenericRoute } from 'src/web/routing/Route';

export class UndifferentiableRouteException extends Error {
  constructor(public readonly routeA: GenericRoute, public readonly routeB: GenericRoute) {
    super(`Can't differentiate between route: "${routeA.method} ${routeA.path}" and "${routeB.method} ${routeB.path}"`);
  }
}
