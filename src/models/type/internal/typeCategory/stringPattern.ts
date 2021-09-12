import { Metadata, StringMetadata, StringPatternMetadata } from 'src/models/type/internal/Metadata';
import { AbstractStringTypeCategory } from 'src/models/type/internal/typeCategory/AbstractStringCategory';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { stringAny } from 'src/models/type/internal/typeCategory/stringAny';

class StringPatternTypeCategory extends AbstractStringTypeCategory<StringPatternMetadata> {
  constructor() {
    super('pattern');
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, StringPatternMetadata>, b: AbstractType<any, StringPatternMetadata>): boolean {
    return a.metadata.examples.every(e => !b.metadata.pattern.test(e));
  }

  protected isDifferentiableWithinSameCategory(a: AbstractType<any, StringPatternMetadata>, b: AbstractType<any, StringMetadata>): boolean {
    if (b.getTypeCategory() === stringAny) {
      return this.checkDifferentiableViaRange(a, b);
    }

    return this.isDifferentiableOtherCategory(a, b);
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, StringPatternMetadata>, b: AbstractType<any, Metadata>): boolean {
    return a.metadata.examples.every(e => !b.is(e));
  }
}

export const stringPattern = new StringPatternTypeCategory();
