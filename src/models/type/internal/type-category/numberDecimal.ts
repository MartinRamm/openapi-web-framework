import { AbstractNumberTypeCategory } from 'src/models/type/internal/type-category/AbstractNumberTypeCategory';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { NumberMetadata } from 'src/models/type/internal/Metadata';

class NumberDecimalTypeCategory extends AbstractNumberTypeCategory {
  constructor() {
    super('decimal');
  }

  protected isDifferentiableOtherCategory(): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(): boolean {
    return true;
  }

  protected isDifferentiableWithinSameSubcategory(
    _ioContext: AbstractIOContext,
    a: AbstractType<any, NumberMetadata>,
    b: AbstractType<any, NumberMetadata>
  ): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }
}

export const numberDecimal = new NumberDecimalTypeCategory();
