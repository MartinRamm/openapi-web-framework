const { pathParamsTestCases } = require('../../../shared/web/routing/internal/pathParamsTestCases');

console.log(`import { expectTypeOf } from 'expect-type';
import { GetPathParamsType } from 'src/web/routing/internal/GetPathParamsType';

// @ts-expect-error
expectTypeOf<GetPathParamsType<1>>();
// @ts-expect-error
expectTypeOf<GetPathParamsType<object>>(); // eslint-disable-line @typescript-eslint/ban-types
`);

Object.entries(pathParamsTestCases).forEach(([name, tests]) => {
  console.log(`// ${name}`);
  tests.forEach(({subName, input, expected}) => {
    let expectedType = expected.length === 0 ? `never` : `'${expected.join("' | '")}'`;
    input = input.replace(/\\/g, '\\\\');
    console.log(`expectTypeOf<GetPathParamsType<'${input}'>>().toEqualTypeOf<${expectedType}>(); // ${subName}`);
  });
  console.log();
});
