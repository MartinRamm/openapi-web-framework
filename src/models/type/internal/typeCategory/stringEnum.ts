import { Metadata, StringMetadata, StringEnumMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { AbstractStringTypeCategory } from 'src/models/type/internal/typeCategory/AbstractStringCategory';
import { stringAny } from 'src/models/type/internal/typeCategory/stringAny';

class StringEnumTypeCategory extends AbstractStringTypeCategory<StringEnumMetadata> {
  constructor() {
    super('enum');
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, StringEnumMetadata>, b: AbstractType<any, StringEnumMetadata>): boolean {
    return a.metadata.enumList.every(i => b.metadata.enumList.includes(i));
  }

  protected isDifferentiableWithinSameCategory(a: AbstractType<any, StringEnumMetadata>, b: AbstractType<any, StringMetadata>): boolean {
    if (b.getTypeCategory() === stringAny) {
      return this.checkDifferentiableViaRange(a, b);
    }

    return this.isDifferentiableOtherCategory(a, b);
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, StringEnumMetadata>, b: AbstractType<any, Metadata>): boolean {
    //if any element in enumList can be parsed as b, return false. else, return true.
    return a.metadata.enumList.every(i => !b.is(i));
  }
}

export const stringEnum = new StringEnumTypeCategory();
