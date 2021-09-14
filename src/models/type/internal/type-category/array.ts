import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';
import { ArrayMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { ArrayRange } from 'src/models/type/internal/type-category/ArrayRange';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

class ArrayTypeCategory extends AbstractTypeCategory<ArrayMetadata, ArrayMetadata> {
  public constructor() {
    super('array', 'array');
  }

  protected isDifferentiableOtherCategory(): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, ArrayMetadata>,
    b: AbstractType<any, ArrayMetadata>
  ): boolean {
    return (
      a.metadata.itemsType.isDifferentiableFrom(b.metadata.itemsType, ioContext) ||
      this.checkDifferentiableViaRange(a, b)
    );
  }

  protected isDifferentiableWithinSameSubcategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, ArrayMetadata>,
    b: AbstractType<any, ArrayMetadata>
  ): boolean {
    return this.isDifferentiableWithinSameCategory(ioContext, a, b);
  }

  protected checkDifferentiableViaRange(a: AbstractType<any, ArrayMetadata>, b: AbstractType<any, ArrayMetadata>) {
    const rangeA = new ArrayRange(a.metadata);
    const rangeB = new ArrayRange(b.metadata);
    return rangeA.isDifferentiableFrom(rangeB);
  }
}

export const array = new ArrayTypeCategory();
