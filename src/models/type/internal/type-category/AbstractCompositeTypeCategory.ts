import { NotOneOfMetadata, OneOfMetadata } from 'src/models/type/internal/Metadata';
import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';

export type CompositeMetadata = OneOfMetadata | NotOneOfMetadata;

export abstract class AbstractCompositeTypeCategory<
  ThisMetadata extends CompositeMetadata
> extends AbstractTypeCategory<CompositeMetadata, ThisMetadata> {
  protected constructor(subCategory: string) {
    super('composite', subCategory);
  }
}
