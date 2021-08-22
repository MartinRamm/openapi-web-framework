import { IsEmptyObject } from 'src/types/IsEmptyObject';
import { expectTypeOf } from 'expect-type';

// @ts-expect-error
expectTypeOf<IsEmptyObject<'test'>>();
// @ts-expect-error
expectTypeOf<IsEmptyObject<1>>();
// @ts-expect-error
expectTypeOf<IsEmptyObject<true>>();
// @ts-expect-error
expectTypeOf<IsEmptyObject<string>>();

expectTypeOf<IsEmptyObject<{}>>().toEqualTypeOf<true>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<IsEmptyObject<Record<string, never>>>().toEqualTypeOf<true>();
expectTypeOf<IsEmptyObject<Record<never, any>>>().toEqualTypeOf<true>();
expectTypeOf<IsEmptyObject<{ [k: string]: never }>>().toEqualTypeOf<true>();
expectTypeOf<IsEmptyObject<Record<never, never>>>().toEqualTypeOf<true>();

expectTypeOf<IsEmptyObject<{ a: true }>>().toEqualTypeOf<false>();
expectTypeOf<IsEmptyObject<{ a?: true }>>().toEqualTypeOf<false>();
expectTypeOf<IsEmptyObject<{ [k: string]: any }>>().toEqualTypeOf<false>();
expectTypeOf<IsEmptyObject<Record<string, any>>>().toEqualTypeOf<false>();
expectTypeOf<IsEmptyObject<Record<any, any>>>().toEqualTypeOf<false>();
