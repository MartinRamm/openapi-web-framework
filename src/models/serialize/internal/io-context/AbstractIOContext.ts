import { GenericType } from 'src/models/type/internal/AbstractType';
import { ContextDataType } from 'src/models/serialize/internal/io-context/ContextDataType';
import { NonEmptyArray } from 'src/types/NonEmptyArray';

export abstract class AbstractIOContext {
  protected constructor(public readonly name: string) {}

  /**
   * Convert a type to the type that will be used in the ioContext.
   * For example, the type `boolean` will be return `string` in the PathParameter ioContext, and `boolean` in the
   * JSON context.
   */
  public abstract mapTypeToDataTypeInContext(type: GenericType): NonEmptyArray<ContextDataType>;
}
