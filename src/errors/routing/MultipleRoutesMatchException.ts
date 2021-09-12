import { GenericRoute } from '../../web/routing/Route';

export class MultipleRoutesMatchException extends Error {
  constructor(public readonly routes: GenericRoute[], public readonly method: string, public readonly path: string) {
    super(`Multiple routes match "${method} ${path}": "${routes.map(r => `${r.method} ${r.path}`).join('", "')}"`);
  }
}
