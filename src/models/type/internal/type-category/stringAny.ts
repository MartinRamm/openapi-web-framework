import { StringLengthMetadata, StringMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { AbstractStringTypeCategory } from 'src/models/type/internal/type-category/AbstractStringTypeCategory';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

class StringAnyTypeCategory extends AbstractStringTypeCategory<StringLengthMetadata> {
  constructor() {
    super('any');
  }

  protected isDifferentiableOtherCategory(): boolean {
    return false;
  }

  protected isDifferentiableWithinSameCategory(
    _ioContext: AbstractIOContext,
    a: AbstractType<any, StringLengthMetadata>,
    b: AbstractType<any, StringMetadata>
  ): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }

  protected isDifferentiableWithinSameSubcategory(
    _ioContext: AbstractIOContext,
    a: AbstractType<any, StringLengthMetadata>,
    b: AbstractType<any, StringLengthMetadata>
  ): boolean {
    return this.checkDifferentiableViaRange(a, b);
  }
}

export const stringAny = new StringAnyTypeCategory();
