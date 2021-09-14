import { Metadata, NotOneOfMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import {
  AbstractCompositeTypeCategory,
  CompositeMetadata,
} from 'src/models/type/internal/type-category/AbstractCompositeTypeCategory';
import { typeCategory } from 'src/models/type/typeCategory';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

class NotOneOfTypeCategory extends AbstractCompositeTypeCategory<NotOneOfMetadata> {
  constructor() {
    super('notOneOf');
  }

  protected isDifferentiableOtherCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, NotOneOfMetadata>,
    b: AbstractType<any, Metadata>
  ): boolean {
    return (
      b.getTypeCategory() !== typeCategory.any && a.metadata.notOneOf.some(i => !i.isDifferentiableFrom(b, ioContext))
    );
  }

  protected isDifferentiableWithinSameCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, NotOneOfMetadata>,
    b: AbstractType<any, CompositeMetadata>
  ): boolean {
    return this.isDifferentiableOtherCategory(ioContext, a, b);
  }

  protected isDifferentiableWithinSameSubcategory(
    _ioContext: AbstractIOContext,
    a: AbstractType<any, NotOneOfMetadata>,
    b: AbstractType<any, NotOneOfMetadata>
  ): boolean {
    const concreteTypeCategoriesA = a.metadata.notOneOf.map(i => i.getTypeCategory());
    const concreteTypeCategoriesB = b.metadata.notOneOf.map(i => i.getTypeCategory());

    const allAvailable = [
      typeCategory.string.any,
      typeCategory.number.any,
      typeCategory.boolean,
      typeCategory.array,
      typeCategory.object,
    ];
    const concreteTypeA = allAvailable.filter(c => concreteTypeCategoriesA.includes(c));
    const concreteTypeB = allAvailable.filter(c => concreteTypeCategoriesB.includes(c));

    return concreteTypeA.every(i => !concreteTypeB.includes(i)) && concreteTypeB.every(i => !concreteTypeA.includes(i));
  }
}

export const notOneOf = new NotOneOfTypeCategory();
