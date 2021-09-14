import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';
import { StringMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { StringRange } from 'src/models/type/internal/type-category/StringRange';

export abstract class AbstractStringTypeCategory<
  SubCategoryMetadata extends StringMetadata
> extends AbstractTypeCategory<StringMetadata, SubCategoryMetadata> {
  protected constructor(subCategory: string) {
    super('string', subCategory);
  }

  protected checkDifferentiableViaRange(a: AbstractType<any, StringMetadata>, b: AbstractType<any, StringMetadata>) {
    const rangeA = new StringRange(a.metadata);
    const rangeB = new StringRange(b.metadata);
    return rangeA.isDifferentiableFrom(rangeB);
  }
}
