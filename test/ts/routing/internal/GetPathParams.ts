import { expectTypeOf } from 'expect-type';
import { GetPathParams } from 'src/web/routing/internal/GetPathParams';

// @ts-expect-error
expectTypeOf<GetPathParams<1>>();
// @ts-expect-error
expectTypeOf<GetPathParams<object>>(); // eslint-disable-line @typescript-eslint/ban-types

expectTypeOf<GetPathParams<'/{asdf}'>>().toEqualTypeOf<'asdf'>();
expectTypeOf<GetPathParams<'/{asdf}/'>>().toEqualTypeOf<'asdf'>();
expectTypeOf<GetPathParams<'/{asdf}/{asdf}'>>().toEqualTypeOf<'asdf'>();
expectTypeOf<GetPathParams<'/{asdf}/{asdf}/'>>().toEqualTypeOf<'asdf'>();

expectTypeOf<GetPathParams<'/{param1}/{param2}/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/{param2}'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/test-{param2}/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/test-{param2}'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/test-{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}/test-{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}-test/{param2}/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}-test/{param2}'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}-test/{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}-test/{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}-test/test-{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/{param1}-test/test-{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/{param2}/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/{param2}'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/test-{param2}/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/test-{param2}'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/test-{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}/test-{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}-test/{param2}/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}-test/{param2}'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}-test/{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}-test/{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}-test/test-{param2}-test/'>>().toEqualTypeOf<'param1' | 'param2'>();
expectTypeOf<GetPathParams<'/test-{param1}-test/test-{param2}-test'>>().toEqualTypeOf<'param1' | 'param2'>();

expectTypeOf<GetPathParams<'/{a}/postfix'>>().toEqualTypeOf<'a'>();
expectTypeOf<GetPathParams<'/{a}/postfix/'>>().toEqualTypeOf<'a'>();
expectTypeOf<GetPathParams<'/{a}/{a}/postfix'>>().toEqualTypeOf<'a'>();
expectTypeOf<GetPathParams<'/{a}/{a}/postfix/'>>().toEqualTypeOf<'a'>();

expectTypeOf<GetPathParams<'/{a}/{b}/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/{b}/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/test-{b}/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/test-{b}/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/test-{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}/test-{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}-test/{b}/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}-test/{b}/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}-test/{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}-test/{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}-test/test-{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/{a}-test/test-{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/{b}/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/{b}/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/test-{b}/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/test-{b}/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/test-{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}/test-{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}-test/{b}/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}-test/{b}/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}-test/{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}-test/{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}-test/test-{b}-test/postfix/'>>().toEqualTypeOf<'a' | 'b'>();
expectTypeOf<GetPathParams<'/test-{a}-test/test-{b}-test/postfix'>>().toEqualTypeOf<'a' | 'b'>();

expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}'>>().toEqualTypeOf<'LongComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/'>>().toEqualTypeOf<'LongComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/{LongComplicatedName}/{LongComplicatedName}'>
>().toEqualTypeOf<'LongComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/{LongComplicatedName}/{LongComplicatedName}/'>
>().toEqualTypeOf<'LongComplicatedName'>();

expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}/'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}-test/'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}-test'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}/'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}-test'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}/'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}-test'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/{LongComplicatedName}-test/test-{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/{LongComplicatedName}-test/test-{EvenLongerAndMoreComplicatedName}-test'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/test-{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}/'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<GetPathParams<'/deep/test-{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/test-{LongComplicatedName}/{EvenLongerAndMoreComplicatedName}-test'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/test-{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}/test-{EvenLongerAndMoreComplicatedName}-test'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<GetPathParams<'/deep/test-{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}'>>().toEqualTypeOf<
  'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}-test/{EvenLongerAndMoreComplicatedName}-test'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}-test/test-{EvenLongerAndMoreComplicatedName}-test/'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();
expectTypeOf<
  GetPathParams<'/deep/test-{LongComplicatedName}-test/test-{EvenLongerAndMoreComplicatedName}-test'>
>().toEqualTypeOf<'LongComplicatedName' | 'EvenLongerAndMoreComplicatedName'>();

expectTypeOf<GetPathParams<'/deep/{path/name}/{Even_Longer~And#More/Complicated?Name}/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/{Even_Longer~And#More/Complicated?Name}'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/{Even_Longer~And#More/Complicated?Name}-test/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/test-{Even_Longer~And#More/Complicated?Name}/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/test-{Even_Longer~And#More/Complicated?Name}'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/test-{Even_Longer~And#More/Complicated?Name}-test/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}/test-{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}-test/{Even_Longer~And#More/Complicated?Name}/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}-test/{Even_Longer~And#More/Complicated?Name}'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}-test/{Even_Longer~And#More/Complicated?Name}-test/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/{path/name}-test/{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<
  GetPathParams<'/deep/{path/name}-test/test-{Even_Longer~And#More/Complicated?Name}-test/'>
>().toEqualTypeOf<'path/name' | 'Even_Longer~And#More/Complicated?Name'>();
expectTypeOf<GetPathParams<'/deep/{path/name}-test/test-{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/{Even_Longer~And#More/Complicated?Name}/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/{Even_Longer~And#More/Complicated?Name}'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/{Even_Longer~And#More/Complicated?Name}-test/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/test-{Even_Longer~And#More/Complicated?Name}/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/test-{Even_Longer~And#More/Complicated?Name}'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{path/name}/test-{Even_Longer~And#More/Complicated?Name}-test/'>
>().toEqualTypeOf<'path/name' | 'Even_Longer~And#More/Complicated?Name'>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}/test-{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}-test/{Even_Longer~And#More/Complicated?Name}/'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}-test/{Even_Longer~And#More/Complicated?Name}'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{path/name}-test/{Even_Longer~And#More/Complicated?Name}-test/'>
>().toEqualTypeOf<'path/name' | 'Even_Longer~And#More/Complicated?Name'>();
expectTypeOf<GetPathParams<'/deep/test-{path/name}-test/{Even_Longer~And#More/Complicated?Name}-test'>>().toEqualTypeOf<
  'path/name' | 'Even_Longer~And#More/Complicated?Name'
>();
expectTypeOf<
  GetPathParams<'/deep/test-{path/name}-test/test-{Even_Longer~And#More/Complicated?Name}-test/'>
>().toEqualTypeOf<'path/name' | 'Even_Longer~And#More/Complicated?Name'>();
expectTypeOf<
  GetPathParams<'/deep/test-{path/name}-test/test-{Even_Longer~And#More/Complicated?Name}-test'>
>().toEqualTypeOf<'path/name' | 'Even_Longer~And#More/Complicated?Name'>();

expectTypeOf<GetPathParams<'/test'>>().toEqualTypeOf<never>();
expectTypeOf<GetPathParams<'/test/other'>>().toEqualTypeOf<never>();
expectTypeOf<GetPathParams<'/test/other/what'>>().toEqualTypeOf<never>();
expectTypeOf<GetPathParams<'/test/oth{er/what'>>().toEqualTypeOf<never>();
expectTypeOf<GetPathParams<'/test/oth}er/what'>>().toEqualTypeOf<never>();

expectTypeOf<GetPathParams<'/'>>().toEqualTypeOf<never>();
expectTypeOf<GetPathParams<'/{one}'>>().toEqualTypeOf<'one'>();
expectTypeOf<GetPathParams<'/{one}/'>>().toEqualTypeOf<'one'>();
expectTypeOf<GetPathParams<'/{one}/{two}'>>().toEqualTypeOf<'one' | 'two'>();
expectTypeOf<GetPathParams<'/{one}/{two}/'>>().toEqualTypeOf<'one' | 'two'>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}'>>().toEqualTypeOf<'one' | 'two' | 'three'>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/'>>().toEqualTypeOf<'one' | 'two' | 'three'>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}'>>().toEqualTypeOf<'one' | 'two' | 'three' | 'four'>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/'>>().toEqualTypeOf<'one' | 'two' | 'three' | 'four'>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/{eight}'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/{eight}/'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/{eight}/{nine}'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/{eight}/{nine}/'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/{eight}/{nine}/{ten}'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten'
>();
expectTypeOf<GetPathParams<'/{one}/{two}/{three}/{four}/{five}/{six}/{seven}/{eight}/{nine}/{ten}/'>>().toEqualTypeOf<
  'one' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten'
>();
