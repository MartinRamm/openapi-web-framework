import { AbstractTypeCategory } from 'src/models/type/internal/typeCategory/AbstractTypeCategory';
import { ArrayMetadata, Metadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { ArrayRange } from 'src/models/type/internal/typeCategory/ArrayRange';

class ArrayTypeCategory extends AbstractTypeCategory<ArrayMetadata, ArrayMetadata> {
  public constructor() {
    super('array', 'array');
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, ArrayMetadata>, b: AbstractType<any, Metadata>): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(a: AbstractType<any, ArrayMetadata>, b: AbstractType<any, ArrayMetadata>): boolean {
    return a.metadata.itemsType.isDifferentiableFrom(b.metadata.itemsType) || this.checkDifferentiableViaRange(a, b);
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, ArrayMetadata>, b: AbstractType<any, ArrayMetadata>): boolean {
    return this.isDifferentiableWithinSameCategory(a, b);
  }

  protected checkDifferentiableViaRange(a: AbstractType<any, ArrayMetadata>, b: AbstractType<any, ArrayMetadata>) {
    const rangeA = new ArrayRange(a.metadata);
    const rangeB = new ArrayRange(b.metadata);
    return rangeA.isDifferentiableFrom(rangeB);
  }
}

export const array = new ArrayTypeCategory();
