import { Metadata, NumberMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import {
  AbstractNumberTypeCategory,
} from 'src/models/type/internal/typeCategory/AbstractNumberTypeCategory';

class NumberAnyTypeCategory extends AbstractNumberTypeCategory {
  constructor() {
    super('any');
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, Metadata>): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, NumberMetadata>): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, NumberMetadata>): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }
}

export const numberAny = new NumberAnyTypeCategory();
