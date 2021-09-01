export class MalformedPathException extends Error {
  public readonly path: string;
  public readonly segment: string;
  constructor(path: string, segment: string) {
    super(`Malformed Path: "${path}" in segment "${segment}"`);
    this.path = path;
    this.segment = segment;
  }
}
