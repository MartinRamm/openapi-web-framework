import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';
import { Metadata } from 'src/models/type/internal/Metadata';

class BooleanTypeCategory extends AbstractTypeCategory<Metadata, Metadata> {
  constructor() {
    super('boolean', 'boolean');
  }

  protected isDifferentiableOtherCategory(): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(): boolean {
    return false;
  }

  protected isDifferentiableWithinSameSubcategory(): boolean {
    return false;
  }
}

export const boolean = new BooleanTypeCategory();
