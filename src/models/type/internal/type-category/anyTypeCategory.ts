import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';
import { Metadata } from 'src/models/type/internal/Metadata';

class AnyTypeCategory extends AbstractTypeCategory<Metadata, Metadata> {
  constructor() {
    super('any', 'any');
  }

  protected isDifferentiableOtherCategory(): boolean {
    return false;
  }

  protected isDifferentiableWithinSameCategory(): boolean {
    return false;
  }

  protected isDifferentiableWithinSameSubcategory(): boolean {
    return false;
  }
}

export const anyTypeCategory = new AnyTypeCategory();
