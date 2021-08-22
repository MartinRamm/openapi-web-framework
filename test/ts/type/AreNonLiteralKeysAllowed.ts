import { expectTypeOf } from 'expect-type';
import { AreNonLiteralKeysAllowed } from 'src/types/AreNonLiteralKeysAllowed';

//checks for empty object
expectTypeOf<AreNonLiteralKeysAllowed<{}>>().toEqualTypeOf<false>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<AreNonLiteralKeysAllowed<Record<string, never>>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<Record<never, any>>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<{ [k: string]: never }>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<Record<never, never>>>().toEqualTypeOf<false>();

expectTypeOf<AreNonLiteralKeysAllowed<{ a: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<{ a?: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<{ a: true; b?: true }>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<{ a: true; b?: true; nested: { [key: string]: any } }>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<Record<'a', any>>>().toEqualTypeOf<false>();
expectTypeOf<AreNonLiteralKeysAllowed<Record<'a' | 'b' | 'c', any>>>().toEqualTypeOf<false>();

expectTypeOf<AreNonLiteralKeysAllowed<Record<'a' | 'b' | 'c' | string, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreNonLiteralKeysAllowed<{ [key: string]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreNonLiteralKeysAllowed<{ [key: number]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreNonLiteralKeysAllowed<{ a: true; [key: string]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreNonLiteralKeysAllowed<{ a?: true; [key: string]: any }>>().toEqualTypeOf<true>();
expectTypeOf<AreNonLiteralKeysAllowed<Record<string, any>>>().toEqualTypeOf<true>();
expectTypeOf<AreNonLiteralKeysAllowed<Record<number, any>>>().toEqualTypeOf<true>();
