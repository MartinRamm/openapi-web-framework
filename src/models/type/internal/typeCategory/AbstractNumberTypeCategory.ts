import { AbstractType } from 'src/models/type/internal/AbstractType';
import { NumberMetadata } from 'src/models/type/internal/Metadata';
import { AbstractTypeCategory } from 'src/models/type/internal/typeCategory/AbstractTypeCategory';
import { NumberRange } from 'src/models/type/internal/typeCategory/NumberRange';

export abstract class AbstractNumberTypeCategory extends AbstractTypeCategory<NumberMetadata, NumberMetadata> {
  protected constructor(subCategory: string) {
    super('number', subCategory);
  }

  protected checkDifferentiableViaRange(a: AbstractType<any, NumberMetadata>, b: AbstractType<any, NumberMetadata>) {
    const rangeA = new NumberRange(a.metadata);
    const rangeB = new NumberRange(b.metadata);
    return rangeA.isDifferentiableFrom(rangeB);
  }
}
