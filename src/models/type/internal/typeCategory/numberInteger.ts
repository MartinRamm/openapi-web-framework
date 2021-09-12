import { Metadata, NumberMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { AbstractNumberTypeCategory } from 'src/models/type/internal/typeCategory/AbstractNumberTypeCategory';

class NumberIntegerTypeCategory extends AbstractNumberTypeCategory {
  constructor() {
    super('integer');
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, Metadata>): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, NumberMetadata>): boolean {
    return true;
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, NumberMetadata>): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }
}

export const numberInteger = new NumberIntegerTypeCategory();
