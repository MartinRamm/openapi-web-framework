export class MalformedPathException extends Error {
  constructor(public readonly errorReason: string, public readonly path: string, public readonly segment: string) {
    super(`Malformed Path: segment "${segment}" in "${path}" caused this error: ${errorReason}`);
  }
}
