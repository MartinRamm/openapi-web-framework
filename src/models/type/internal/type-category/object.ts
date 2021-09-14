import { AbstractTypeCategory } from 'src/models/type/internal/type-category/AbstractTypeCategory';
import { ObjectMetadata } from 'src/models/type/internal/Metadata';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { ObjectRange } from 'src/models/type/internal/type-category/ObjectRange';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';

class ObjectTypeCategory extends AbstractTypeCategory<ObjectMetadata, ObjectMetadata> {
  public constructor() {
    super('object', 'object');
  }

  protected isDifferentiableOtherCategory(): boolean {
    return true;
  }

  protected isDifferentiableWithinSameCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, ObjectMetadata>,
    b: AbstractType<any, ObjectMetadata>
  ): boolean {
    if (!('spec' in a.metadata) && !('spec' in b.metadata)) {
      const rangeA = new ObjectRange(a.metadata);
      const rangeB = new ObjectRange(b.metadata);
      return rangeA.isDifferentiableFrom(rangeB);
    } else if ('spec' in a.metadata && 'spec' in b.metadata) {
      const specA = a.metadata.spec;
      const specB = b.metadata.spec;

      return Object.keys(specA).some(key => {
        if (!Object.prototype.hasOwnProperty.call(specB, key)) {
          return true;
        }
        return specA[key].isDifferentiableFrom(specB[key], ioContext);
      });
    }
    return false;
  }

  protected isDifferentiableWithinSameSubcategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, ObjectMetadata>,
    b: AbstractType<any, ObjectMetadata>
  ): boolean {
    return this.isDifferentiableWithinSameCategory(ioContext, a, b);
  }
}

export const object = new ObjectTypeCategory();
