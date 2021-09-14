import { Either } from 'src/fp/Either';
import { SerializableTypes } from 'src/models/serialize/value/SerializableTypes';
import { TypeValidationException } from 'src/errors/TypeValidationException';
import { Metadata as MetadataInterface } from 'src/models/type/internal/Metadata';
import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

export type GenericType = AbstractType<any, any>;

export abstract class AbstractType<JsType, Metadata extends MetadataInterface> {
  protected constructor(public readonly metadata: Metadata) {}

  public abstract getTypeCategory(): AbstractTypeCategory<any, Metadata>;

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

  public isDifferentiableFrom(otherType: AbstractType<any, any>, ioContext: AbstractIOContext): boolean {
    return this.getTypeCategory().isDifferentiable(this, otherType, ioContext);
  }

  /**
   * Convert a value to a serializable type.
   * @See src/models/serialize/value/AbstractValueSerializer
   */
  public abstract prepareSerialize(value: JsType): SerializableTypes;
}
