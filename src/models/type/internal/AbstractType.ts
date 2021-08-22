import { Either } from 'src/fp/Either';
import { SerializableTypes } from 'src/models/serialize/value/SerializableTypes';
import { TypeValidationException } from 'src/errors/TypeValidationException';
import { Metadata as MetadataInterface } from 'src/models/type/internal/Metadata';

export abstract class AbstractType<JsType, Metadata extends MetadataInterface> {
  protected metadata: Metadata;

  public constructor(metadata: Metadata) {
    this.metadata = metadata;
  }

  /**
   * Validate that a value fulfills all constraints of the type.
   */
  public abstract validateValue(value: unknown): Either<TypeValidationException, JsType>;

  /**
   * Type guard for this type that ensures the fulfillment of all constraints of this type.
   */
  public is(value: unknown): value is JsType {
    return this.validateValue(value).map({ onLeft: () => false, onRight: () => true });
  }

  /**
   * Convert a value to a serializable type.
   * @See src/models/serialize/value/AbstractValueSerializer
   */
  public abstract prepareSerialize(value: JsType): SerializableTypes;
}
