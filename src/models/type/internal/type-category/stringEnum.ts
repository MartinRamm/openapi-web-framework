import { Metadata, StringMetadata, StringEnumMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { AbstractStringTypeCategory } from 'src/models/type/internal/type-category/AbstractStringTypeCategory';
import { stringAny } from 'src/models/type/internal/type-category/stringAny';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

class StringEnumTypeCategory extends AbstractStringTypeCategory<StringEnumMetadata> {
  constructor() {
    super('enum');
  }

  protected isDifferentiableWithinSameSubcategory(
    _ioContext: AbstractIOContext,
    a: AbstractType<any, StringEnumMetadata>,
    b: AbstractType<any, StringEnumMetadata>
  ): boolean {
    return a.metadata.enumList.every(i => b.metadata.enumList.includes(i));
  }

  protected isDifferentiableWithinSameCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, StringEnumMetadata>,
    b: AbstractType<any, StringMetadata>
  ): boolean {
    if (b.getTypeCategory() === stringAny) {
      return this.checkDifferentiableViaRange(a, b);
    }

    return this.isDifferentiableOtherCategory(ioContext, a, b);
  }

  protected isDifferentiableOtherCategory(
    _ioContext: AbstractIOContext,
    a: AbstractType<any, StringEnumMetadata>,
    b: AbstractType<any, Metadata>
  ): boolean {
    //if any element in enumList can be parsed as b, return false. else, return true.
    return a.metadata.enumList.every(i => !b.is(i));
  }
}

export const stringEnum = new StringEnumTypeCategory();
