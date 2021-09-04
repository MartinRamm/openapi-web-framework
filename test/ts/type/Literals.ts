import { expectTypeOf } from 'expect-type';
import { StringLiteral } from 'src/types/literals/StringLiteral';
import { IsStringLiteral } from 'src/types/literals/IsStringLiteral';
import { NumericLiteral } from 'src/types/literals/NumericLiteral';
import { IsNumericLiteral } from 'src/types/literals/IsNumericLiteral';

expectTypeOf<StringLiteral<'a'>>().toMatchTypeOf<string>();
expectTypeOf<StringLiteral<'a'>>().toEqualTypeOf<'a'>();

expectTypeOf<string>().not.toMatchTypeOf<StringLiteral<'a' | 1>>();
expectTypeOf<string>().not.toMatchTypeOf<StringLiteral<'a'>>();
expectTypeOf<StringLiteral<'a'>>().toEqualTypeOf<'a'>();
expectTypeOf<StringLiteral<'a'>>().not.toMatchTypeOf<'b'>();
expectTypeOf<StringLiteral<'a' | 'b'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<StringLiteral<'a' | 'b'>>().toMatchTypeOf('a');
expectTypeOf<StringLiteral<'a' | 'b'>>().toMatchTypeOf('b');
expectTypeOf<StringLiteral<'a' | 'b'>>().not.toMatchTypeOf<'c'>();
expectTypeOf<StringLiteral<'a' | 'b'>>().not.toMatchTypeOf<3>();
expectTypeOf<StringLiteral<string>>().not.toMatchTypeOf<1>();
expectTypeOf<StringLiteral<string>>().not.toMatchTypeOf<'a'>();
expectTypeOf<StringLiteral<string>>().not.toMatchTypeOf<'a' | 'b'>();
expectTypeOf<StringLiteral<string>>().not.toMatchTypeOf<string>();

expectTypeOf<IsStringLiteral<'a'>>().toEqualTypeOf<true>();
expectTypeOf<IsStringLiteral<'a' | 'b'>>().toEqualTypeOf<true>();
expectTypeOf<IsStringLiteral<keyof Record<'a', any>>>().toEqualTypeOf<true>();
expectTypeOf<IsStringLiteral<keyof Record<'a' | 'b', any>>>().toEqualTypeOf<true>();
expectTypeOf<IsStringLiteral<keyof { a: true }>>().toEqualTypeOf<true>();
expectTypeOf<IsStringLiteral<keyof { a?: true }>>().toEqualTypeOf<true>();
expectTypeOf<IsStringLiteral<keyof {}>>().toEqualTypeOf<false>(); // eslint-disable-line @typescript-eslint/ban-types
expectTypeOf<IsStringLiteral<keyof { a?: true; [k: string]: any }>>().toEqualTypeOf<false>();
expectTypeOf<IsStringLiteral<string>>().toEqualTypeOf<false>();
expectTypeOf<IsStringLiteral<keyof Record<string, any>>>().toEqualTypeOf<false>();

expectTypeOf<NumericLiteral<1>>().toMatchTypeOf<number>();
expectTypeOf<number>().not.toMatchTypeOf<NumericLiteral<1>>();
expectTypeOf<NumericLiteral<1>>().toMatchTypeOf(1);
expectTypeOf<NumericLiteral<1>>().not.toMatchTypeOf<2>();
expectTypeOf<NumericLiteral<1 | 2>>().toMatchTypeOf(1);
expectTypeOf<NumericLiteral<1 | 2>>().toMatchTypeOf(2);
expectTypeOf<NumericLiteral<1 | 2>>().not.toMatchTypeOf<3>();
expectTypeOf<NumericLiteral<1 | 2>>().not.toMatchTypeOf<'c'>();
expectTypeOf<NumericLiteral<number>>().not.toMatchTypeOf<'a'>();
expectTypeOf<NumericLiteral<number>>().not.toMatchTypeOf<1>();
expectTypeOf<NumericLiteral<number>>().not.toMatchTypeOf<1 | 2>();
expectTypeOf<NumericLiteral<number>>().not.toMatchTypeOf<number>();

expectTypeOf<IsNumericLiteral<1>>().toEqualTypeOf<true>();
expectTypeOf<IsNumericLiteral<1 | 2>>().toEqualTypeOf<true>();
expectTypeOf<IsNumericLiteral<keyof Record<1, any>>>().toEqualTypeOf<true>();
expectTypeOf<IsNumericLiteral<keyof Record<1 | 2, any>>>().toEqualTypeOf<true>();
expectTypeOf<IsNumericLiteral<keyof { a: true }>>().toEqualTypeOf<false>();
expectTypeOf<IsNumericLiteral<number>>().toEqualTypeOf<false>();
