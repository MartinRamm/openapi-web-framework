export class TypeValidationException extends Error {
  public readonly value: unknown;
  public readonly expectedType: string;

  constructor(value: unknown, expectedType: string) {
    super(`Expected ${JSON.stringify(value)} to be a ${expectedType}`);
    this.value = value;
    this.expectedType = expectedType;
  }
}
