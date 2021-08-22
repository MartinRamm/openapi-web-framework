/**
 * A precise number tells the serializer to treat the underlying string value as a number, instead of a string.
 * For example, a JSON serializer is expected to convert:
 * `{a: new PreciseNumber('123456789012345678901234567890')}`
 * into
 * {"a": 123456789012345678901234567890}
 * and NOT into
 * {"a": "123456789012345678901234567890"}.
 * This is to avoid precision problems of the node runtime, which stores numbers as double-precision 64-bit floats:
 * JSON.stringify({a: 123456789012345678901234567890}) //{"a":1.2345678901234568e+29}.
 *
 * The serializers are not expected to validate this string. But based on the language requirements, it may decide to
 * throw an error if the value does not follow it. Therefore, it is generally a good idea to follow the number format
 * requirements that the JSON schema requires: https://datatracker.ietf.org/doc/html/rfc7159#section-6 - this is
 * generally compatible to the other formats.
 */
export class PreciseNumber {
  public readonly value: string;

  public constructor(value: string) {
    this.value = value;
  }
}
