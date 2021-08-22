import { expectTypeOf } from 'expect-type';
import { IsNever } from 'src/types/IsNever';

expectTypeOf<IsNever<never>>().toEqualTypeOf<true>();
expectTypeOf<IsNever<any>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<string>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<'string'>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<true>>().toEqualTypeOf<false>();
expectTypeOf<IsNever<false>>().toEqualTypeOf<false>();
