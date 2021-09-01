export class MethodNotAllowedException extends Error {
  public readonly method: string;
  public readonly allowedMethods: string[];
  constructor(method: string, allowedMethods: string[]) {
    super(`Method "${method}" not allowed. Allowed methods are: "${allowedMethods.join('", "')}"`);
    this.method = method;
    this.allowedMethods = allowedMethods;
  }
}
