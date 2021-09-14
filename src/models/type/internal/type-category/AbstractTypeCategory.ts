import { AbstractType } from 'src/models/type/internal/AbstractType';
import { Metadata } from 'src/models/type/internal/Metadata';
import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';
import { AbstractCompositeTypeCategory } from 'src/models/type/internal/type-category/AbstractCompositeTypeCategory';

/**
 * Can two parameters be differentiated at runtime is being handled in this class.
 * Lets assume two routes: `GET /new/{1}`, where `{1}` is an `integer` and `GET /new/{2}`, where `{2}` is an `uuid`
 * can be differentiated easily. But what when `{1}` is a `int32` and `{2}` is a `int64`? This is not differentiable in
 * most cases. As this framework wants to warn the user in the second case proactively, we need to find a way to
 * determine problematic cases.
 *
 * This was implemented like this:
 *    * The ioContext matters. Determining if two types are differentiable depends on where the differentiation should
 *      occur. A boolean type is differentiable to `string.any` in a JSON object, but not in a path. So first, we check
 *      if the ioContext uses different data types for the two types.
 *    * each instance of `AbstractType` is now associated with a `category` and a `subCategory` (i.e. an instance of
 *      this class).
 *    * With this, each type can decide how to treat:
 *        * comparisons with the same subCategory (i.e.: int64 to int32)
 *        * comparisons with the same category but not the same subCategory (i.e.: int64 to float)
 *        * comparisons with other categories (i.e.: int64 to email)
 *    * Both `isActuallyDifferentiable('typeA', 'typeB')` and `isActuallyDifferentiable('typeB', 'typeA')` must be
 *      evaluated. This is done so that in cases like `isActuallyDifferentiable('int32', 'string.any')`, `int32` doesn't
 *      need to know anything about `string.any` (i.e.: `isActuallyDifferentiable('int32', 'string.any')` will probably
 *      return true, because generally an integer can be differentiated with a type of another category. But
 *      `isActuallyDifferentiable('string.any', 'int32')` will return false because `string.any` is never differentiable
 *      with a type of another category. There is one exception: comparing composite types (i.e. `oneOf` or `not`)
 *      with non-composite types (i.e. string) will cause only `isActuallyDifferentiable(compositeType, nonCompositeType)`
 *      to be called.
 */
export abstract class AbstractTypeCategory<CategoryMetadata extends Metadata, SubCategoryMetadata extends Metadata> {
  protected constructor(public readonly category: string, public readonly subCategory: string) {}

  public isDifferentiable(
    a: AbstractType<any, SubCategoryMetadata>,
    b: AbstractType<any, Metadata>,
    ioContext: AbstractIOContext
  ): boolean {
    if ('nullable' in a.metadata && a.metadata.nullable && 'nullable' in b.metadata && b.metadata.nullable) {
      return false;
    }

    const ioTypesA = ioContext.mapTypeToDataTypeInContext(a);
    const ioTypesB = ioContext.mapTypeToDataTypeInContext(b);
    if (ioTypesA.every(i => !ioTypesB.includes(i))) {
      return true;
    }

    if (
      this instanceof AbstractCompositeTypeCategory &&
      !(b.getTypeCategory() instanceof AbstractCompositeTypeCategory)
    ) {
      return this.isActuallyDifferentiable(ioContext, a, b);
    } else if (
      !(this instanceof AbstractCompositeTypeCategory) &&
      b.getTypeCategory() instanceof AbstractCompositeTypeCategory
    ) {
      return b.getTypeCategory().isActuallyDifferentiable(ioContext, b, a);
    } else {
      return (
        this.isActuallyDifferentiable(ioContext, a, b) && b.getTypeCategory().isActuallyDifferentiable(ioContext, b, a)
      );
    }
  }

  protected isActuallyDifferentiable(
    ioContext: AbstractIOContext,
    a: AbstractType<any, SubCategoryMetadata>,
    b: AbstractType<any, Metadata>
  ): boolean {
    const isSameCategory = (type: typeof b): type is AbstractType<any, CategoryMetadata> =>
      a.getTypeCategory().category === type.getTypeCategory().category;
    const isSameSubCategory = (type: typeof b): type is AbstractType<any, SubCategoryMetadata> =>
      isSameCategory(type) && a.getTypeCategory().subCategory === type.getTypeCategory().subCategory;
    if (isSameSubCategory(b)) {
      return this.isDifferentiableWithinSameSubcategory(ioContext, a, b);
    }
    if (isSameCategory(b)) {
      return this.isDifferentiableWithinSameCategory(ioContext, a, b);
    }

    return this.isDifferentiableOtherCategory(ioContext, a, b);
  }

  protected abstract isDifferentiableWithinSameSubcategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, SubCategoryMetadata>,
    b: AbstractType<any, SubCategoryMetadata>
  ): boolean;
  protected abstract isDifferentiableWithinSameCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, SubCategoryMetadata>,
    b: AbstractType<any, CategoryMetadata>
  ): boolean;
  protected abstract isDifferentiableOtherCategory(
    ioContext: AbstractIOContext,
    a: AbstractType<any, SubCategoryMetadata>,
    b: AbstractType<any, Metadata>
  ): boolean;
}
