import { expectTypeOf } from 'expect-type';
import { NonEmptyArray } from 'src/types/NonEmptyArray';

expectTypeOf<[]>().not.toEqualTypeOf<NonEmptyArray<any>>()
expectTypeOf<[]>().not.toEqualTypeOf<NonEmptyArray<number>>()
expectTypeOf<[]>().not.toEqualTypeOf<NonEmptyArray<string>>()

expectTypeOf<[1]>().toMatchTypeOf<NonEmptyArray<any>>()
expectTypeOf<[1]>().toMatchTypeOf<NonEmptyArray<number>>()
expectTypeOf<[1]>().not.toMatchTypeOf<NonEmptyArray<string>>()
expectTypeOf<['1']>().toMatchTypeOf<NonEmptyArray<string>>()
