import { AbstractTypeCategory } from 'src/models/type/internal/typeCategory/AbstractTypeCategory';
import { Metadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';

class BooleanTypeCategory extends AbstractTypeCategory<Metadata, Metadata> {
  constructor() {
    super('boolean', 'boolean');
  }

  protected isDifferentiableOtherCategory(a: AbstractType<any, Metadata>, b: AbstractType<any, Metadata>): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(a: AbstractType<any, Metadata>, b: AbstractType<any, Metadata>): boolean {
    return false;
  }

  protected isDifferentiableWithinSameSubcategory(a: AbstractType<any, Metadata>, b: AbstractType<any, Metadata>): boolean {
    return false;
  }
}

export const boolean = new BooleanTypeCategory();
