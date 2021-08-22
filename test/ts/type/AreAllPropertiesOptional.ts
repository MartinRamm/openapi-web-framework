import { AreAllPropertiesOptional, AreAllPropertiesOptionalHandleEmpty } from 'src/types/AreAllPropertiesOptional';
import { expectTypeOf } from 'expect-type';

// @ts-expect-error
expectTypeOf<AreAllPropertiesOptional<'test'>>();
// @ts-expect-error
expectTypeOf<AreAllPropertiesOptional<1>>();
// @ts-expect-error
expectTypeOf<AreAllPropertiesOptional<true>>();
// @ts-expect-error
expectTypeOf<AreAllPropertiesOptional<string>>();

// @ts-expect-error
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<0, Record<never, never>>>();
// @ts-expect-error
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<'true', Record<never, never>>>();
// @ts-expect-error
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<'false', Record<never, never>>>();

expectTypeOf<AreAllPropertiesOptional<{}>>().toEqualTypeOf<true>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, {}>>().toEqualTypeOf<true>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, {}>>().toEqualTypeOf<false>(); // eslint-disable-line @typescript-eslint/ban-types

expectTypeOf<AreAllPropertiesOptional<Record<string, never>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, Record<string, never>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, Record<string, never>>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<Record<never, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, Record<never, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, Record<never, any>>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<Record<never, never>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, Record<never, never>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, Record<never, never>>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<{ [k: string]: never }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { [k: string]: never }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { [k: string]: never }>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<{ [k: string]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { [k: string]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { [k: string]: any }>>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<{ [k: number]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { [k: number]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { [k: number]: any }>>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<Record<string, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, Record<string, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, Record<string, any>>>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<Record<number, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, Record<number, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, Record<number, any>>>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<{ a?: true }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a?: true }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a?: true }>>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<{ a?: true; b?: true }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a?: true; b?: true }>>().toEqualTypeOf<true>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a?: true; b?: true }>>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<{ a?: true; b?: true; nested?: { a: true } }>>().toEqualTypeOf<true>();
expectTypeOf<
  AreAllPropertiesOptionalHandleEmpty<true, { a?: true; b?: true; nested?: { a: true } }>
>().toEqualTypeOf<true>();
expectTypeOf<
  AreAllPropertiesOptionalHandleEmpty<false, { a?: true; b?: true; nested?: { a: true } }>
>().toEqualTypeOf<true>();

expectTypeOf<AreAllPropertiesOptional<{ a: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a: true }>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<{ a: true; b?: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a: true; b?: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a: true; b?: true }>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<{ a?: true; b: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a?: true; b: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a?: true; b: true }>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<{ a?: true; b: { c?: true } }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a?: true; b: { c?: true } }>>().toEqualTypeOf<false>();
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a?: true; b: { c?: true } }>>().toEqualTypeOf<false>();

expectTypeOf<AreAllPropertiesOptional<{ a?: true; b?: true; nested: {} }>>().toEqualTypeOf<false>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<true, { a?: true; b?: true; nested: {} }>>().toEqualTypeOf<false>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<AreAllPropertiesOptionalHandleEmpty<false, { a?: true; b?: true; nested: {} }>>().toEqualTypeOf<false>(); // eslint-disable-line @typescript-eslint/ban-types

expectTypeOf<AreAllPropertiesOptional<{ a?: true; b?: true; nested: { a?: true } }>>().toEqualTypeOf<false>();
expectTypeOf<
  AreAllPropertiesOptionalHandleEmpty<true, { a?: true; b?: true; nested: { a?: true } }>
>().toEqualTypeOf<false>();
expectTypeOf<
  AreAllPropertiesOptionalHandleEmpty<false, { a?: true; b?: true; nested: { a?: true } }>
>().toEqualTypeOf<false>();
