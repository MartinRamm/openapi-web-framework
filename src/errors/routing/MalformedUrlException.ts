export class MalformedUrlException extends Error {
  public readonly route;
  constructor(route: string) {
    super(`Malformed URL: "${route}"`);
    this.route = route;
  }
}
