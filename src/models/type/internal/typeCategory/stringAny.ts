import { Metadata, StringLengthMetadata, StringMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { AbstractStringTypeCategory } from 'src/models/type/internal/typeCategory/AbstractStringCategory';

class StringAnyTypeCategory extends AbstractStringTypeCategory<StringLengthMetadata> {
  constructor() {
    super('any');
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, StringLengthMetadata>, b: AbstractType<any, Metadata>): boolean {
    return false;
  }

  protected  isDifferentiableWithinSameCategory(a: AbstractType<any, StringLengthMetadata>, b: AbstractType<any, StringMetadata>): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, StringLengthMetadata>, b: AbstractType<any, StringLengthMetadata>): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }

  protected isDifferentiableSameType(a: AbstractType<any, StringLengthMetadata>, b: AbstractType<any, StringLengthMetadata>): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }
}

export const stringAny = new StringAnyTypeCategory();

