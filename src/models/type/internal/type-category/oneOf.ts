import { Metadata, OneOfMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import {
  AbstractCompositeTypeCategory,
  CompositeMetadata,
} from 'src/models/type/internal/type-category/AbstractCompositeTypeCategory';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

class OneOfTypeCategory extends AbstractCompositeTypeCategory<OneOfMetadata> {
  constructor() {
    super('oneOf');
  }

  protected isDifferentiableOtherCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, OneOfMetadata>,
    b: AbstractType<any, Metadata>
  ): boolean {
    return a.metadata.oneOf.every(i => i.isDifferentiableFrom(b, ioContext));
  }

  protected isDifferentiableWithinSameCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, OneOfMetadata>,
    b: AbstractType<any, CompositeMetadata>
  ): boolean {
    return this.isDifferentiableOtherCategory(ioContext, a, b);
  }

  protected isDifferentiableWithinSameSubcategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, OneOfMetadata>,
    b: AbstractType<any, OneOfMetadata>
  ): boolean {
    return a.metadata.oneOf.every(i => b.metadata.oneOf.every(ii => i.isDifferentiableFrom(ii, ioContext)));
  }
}

export const oneOf = new OneOfTypeCategory();
