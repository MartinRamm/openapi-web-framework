import { expectTypeOf } from 'expect-type';
import { test } from 'src/test';

expectTypeOf(test).toBeString();
expectTypeOf<typeof test>().toEqualTypeOf<'test'>();
