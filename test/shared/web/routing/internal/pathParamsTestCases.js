let testCases = {};

const addTestCase = (name, input, expectedParams, expectedPathWithoutParams) => {
  const testCase = (name, rawInput, expectedPathWithoutParams) => {
    testCases = {
      ...testCases,
      [name]: [
        { expectedParams, expectedPathWithoutParams, name, subName: 'raw', input: rawInput },
        {
          expectedParams,
          expectedPathWithoutParams: `${expectedPathWithoutParams}/`,
          name,
          subName: 'postfix: slash',
          input: `${rawInput}/`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `/${expectedPathWithoutParams}`,
          name,
          subName: 'prefix: slash',
          input: `/${rawInput}`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `/${expectedPathWithoutParams}/`,
          name,
          subName: 'pre- and postfix: slash',
          input: `/${rawInput}/`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `\\{${expectedPathWithoutParams}`,
          name,
          subName: 'prefix: escaped {',
          input: `\\{${rawInput}`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `\\}${expectedPathWithoutParams}`,
          name,
          subName: 'prefix: escaped }',
          input: `\\}${rawInput}`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `${expectedPathWithoutParams}\\{`,
          name,
          subName: 'postfix: escaped {',
          input: `${rawInput}\\{`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `${expectedPathWithoutParams}\\}`,
          name,
          subName: 'postfix: escaped }',
          input: `${rawInput}\\}`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `\\{${expectedPathWithoutParams}\\}`,
          name,
          subName: 'pre- and postfix: escaped brackets',
          input: `\\{${rawInput}\\}`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `\\{${expectedPathWithoutParams}\\{`,
          name,
          subName: 'pre- and postfix: escaped {',
          input: `\\{${rawInput}\\{`,
        },
        {
          expectedParams,
          expectedPathWithoutParams: `\\}${expectedPathWithoutParams}\\}`,
          name,
          subName: 'pre- and postfix: escaped }',
          input: `\\}${rawInput}\\}`,
        },
      ],
    };
  };

  testCase(name, input, expectedPathWithoutParams);
  testCase(`${name} with path prefix`, `new/${input}`, `new/${expectedPathWithoutParams}`);
  testCase(`${name} with path postfix`, `${input}/new`, `${expectedPathWithoutParams}/new`);
  testCase(`${name} with path prefix and postfix`, `new/${input}/new`, `new/${expectedPathWithoutParams}/new`);
};

addTestCase('no param', 'animal', [], 'animal');

let expectedParams = [];
let paramOnly = '';
let expectedPathWithoutParamsParamOnly = '';
let paramWithPrefix = '';
let expectedPathWithoutParamsWithPrefix = '';
let paramWithPostfix = '';
let expectedPathWithoutParamsWithPostfix = '';
let paramWithPreAndPostfix = '';
let expectedPathWithoutParamsWithPreAndPostfix = '';
for (let i = 1; i <= 10; i++) {
  expectedParams = [...expectedParams, `param${i}`];

  paramOnly += i === 1 ? '' : '/';
  paramOnly += `{param${i}}`;
  expectedPathWithoutParamsParamOnly += i === 1 ? '' : '/';
  expectedPathWithoutParamsParamOnly += '{}';
  addTestCase(`${i} param`, paramOnly, expectedParams, expectedPathWithoutParamsParamOnly);

  paramWithPrefix += i === 1 ? '' : '/';
  paramWithPrefix += `prefix-{param${i}}`;
  expectedPathWithoutParamsWithPrefix += i === 1 ? '' : '/';
  expectedPathWithoutParamsWithPrefix += 'prefix-{}';
  addTestCase(`${i} prefixed param`, paramWithPrefix, expectedParams, expectedPathWithoutParamsWithPrefix);

  paramWithPostfix += i === 1 ? '' : '/';
  paramWithPostfix += `{param${i}}-postfix`;
  expectedPathWithoutParamsWithPostfix += i === 1 ? '' : '/';
  expectedPathWithoutParamsWithPostfix += '{}-postfix';
  addTestCase(`${i} postfixed param`, paramWithPostfix, expectedParams, expectedPathWithoutParamsWithPostfix);

  paramWithPreAndPostfix += i === 1 ? '' : '/';
  paramWithPreAndPostfix += `prefix-{param${i}}-postfix`;
  expectedPathWithoutParamsWithPreAndPostfix += i === 1 ? '' : '/';
  expectedPathWithoutParamsWithPreAndPostfix += 'prefix-{}-postfix';
  addTestCase(
    `${i} pre- and postfixed param`,
    paramWithPreAndPostfix,
    expectedParams,
    expectedPathWithoutParamsWithPreAndPostfix
  );
}

const addTestCaseWithExtraParams = (name, input, expectedParams, expectedPathWithoutParams) => {
  addTestCase(name, input, expectedParams, expectedPathWithoutParams);
  let paramsString = '';
  let withoutParamsString = '';
  let paramsArray = [];
  for (let i = 1; i <= 3; i++) {
    paramsString += i === 1 ? '' : '/';
    paramsString += `{_${i}}`;
    withoutParamsString += i === 1 ? '' : '/';
    withoutParamsString += '{}';
    paramsArray = [...paramsArray, `_${i}`];

    addTestCase(
      `${i} param followed by ${name}`,
      `${paramsString}/${input}`,
      [...paramsArray, ...expectedParams],
      `${withoutParamsString}/${expectedPathWithoutParams}`
    );
    addTestCase(
      `${name} followed by ${i} param`,
      `${input}/${paramsString}`,
      [...expectedParams, ...paramsArray],
      `${expectedPathWithoutParams}/${withoutParamsString}`
    );
  }
};

addTestCaseWithExtraParams('escaped }', '\\}asdf', [], '\\}asdf');

addTestCaseWithExtraParams('escaped {', '\\{asdf', [], '\\{asdf');

addTestCaseWithExtraParams('escaped { and }', '\\{asdf\\}', [], '\\{asdf\\}');

addTestCaseWithExtraParams('escaped param containing nested unescaped param', '\\{{as}\\}', ['as'], '\\{{}\\}');
addTestCaseWithExtraParams(
  '2 escaped param containing nested unescaped param',
  '\\{{as}\\}/\\{{df}\\}',
  ['as', 'df'],
  '\\{{}\\}/\\{{}\\}'
);

addTestCaseWithExtraParams(
  'escaped param containing nested unescaped param with prefix',
  '\\{z{as}\\}',
  ['as'],
  '\\{z{}\\}'
);
addTestCaseWithExtraParams(
  '2 escaped param containing nested unescaped param with prefix',
  '\\{z{as}\\}/\\{z{df}\\}',
  ['as', 'df'],
  '\\{z{}\\}/\\{z{}\\}'
);

addTestCaseWithExtraParams(
  'escaped param containing nested unescaped param with postfix',
  '\\{{as}z\\}',
  ['as'],
  '\\{{}z\\}'
);
addTestCaseWithExtraParams(
  '2 escaped param containing nested unescaped param with postfix',
  '\\{{as}z\\}/\\{{df}z\\}',
  ['as', 'df'],
  '\\{{}z\\}/\\{{}z\\}'
);

addTestCaseWithExtraParams(
  'escaped param containing nested unescaped param with pre- and postfix',
  '\\{z{as}z\\}',
  ['as'],
  '\\{z{}z\\}'
);
addTestCaseWithExtraParams(
  '2 escaped param containing nested unescaped param with pre- and postfix',
  '\\{z{as}z\\}/\\{z{df}z\\}',
  ['as', 'df'],
  '\\{z{}z\\}/\\{z{}z\\}'
);

addTestCaseWithExtraParams('param name containing escaped } in middle', '{as\\}df}', ['as}df'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped } in middle',
  '{as\\}df}/{gh\\}ij}',
  ['as}df', 'gh}ij'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped } in middle',
  '{as\\}df}/{_}/{gh\\}ij}',
  ['as}df', '_', 'gh}ij'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped } at end', '{asdf\\}}', ['asdf}'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped } at end',
  '{asdf\\}}/{ghij\\}}',
  ['asdf}', 'ghij}'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped } at end',
  '{asdf\\}}/{_}/{ghij\\}}',
  ['asdf}', '_', 'ghij}'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped } at start', '{\\}asdf}', ['}asdf'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped } at start',
  '{\\}asdf}/{\\}ghij}',
  ['}asdf', '}ghij'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped } at start',
  '{\\}asdf}/{_}/{\\}ghij}',
  ['}asdf', '_', '}ghij'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped { in middle', '{as\\{df}', ['as{df'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped { in middle',
  '{as\\{df}/{gh\\{ij}',
  ['as{df', 'gh{ij'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped { in middle',
  '{as\\{df}/{_}/{gh\\{ij}',
  ['as{df', '_', 'gh{ij'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped { at end', '{asdf\\{}', ['asdf{'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped { at end',
  '{asdf\\{}/{ghij\\{}',
  ['asdf{', 'ghij{'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped { at end',
  '{asdf\\{}/{_}/{ghij\\{}',
  ['asdf{', '_', 'ghij{'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped { at start', '{\\{asdf}', ['{asdf'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped { at start',
  '{\\{asdf}/{\\{ghij}',
  ['{asdf', '{ghij'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped { at start',
  '{\\{asdf}/{_}/{\\{ghij}',
  ['{asdf', '_', '{ghij'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped { and }', '{\\{as\\}}', ['{as}'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped { and }',
  '{\\{as\\}}/{\\{df\\}}',
  ['{as}', '{df}'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names seperated by a simple param containing escaped { and }',
  '{\\{as\\}}/{_}/{\\{df\\}}',
  ['{as}', '_', '{df}'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped { and } with prefix', '{z\\{as\\}}', ['z{as}'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped { and } with prefix',
  '{z\\{as\\}}/{z\\{df\\}}',
  ['z{as}', 'z{df}'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names separated by a simple param containing escaped { and } with prefix',
  '{z\\{as\\}}/{_}/{z\\{df\\}}',
  ['z{as}', '_', 'z{df}'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams('param name containing escaped { and } with postfix', '{\\{as\\}z}', ['{as}z'], '{}');
addTestCaseWithExtraParams(
  '2 param names containing escaped { and } with postfix',
  '{\\{as\\}z}/{\\{df\\}z}',
  ['{as}z', '{df}z'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names separated by a simple param containing escaped { and } with postfix',
  '{\\{as\\}z}/{_}/{\\{df\\}z}',
  ['{as}z', '_', '{df}z'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams(
  'param name containing escaped { and } with pre- and postfix',
  '{z\\{as\\}z}',
  ['z{as}z'],
  '{}'
);
addTestCaseWithExtraParams(
  '2 param names containing escaped { and } with pre- and postfix',
  '{z\\{as\\}z}/{z\\{df\\}z}',
  ['z{as}z', 'z{df}z'],
  '{}/{}'
);
addTestCaseWithExtraParams(
  '2 param names separated by a simple param containing escaped { and } with pre- and postfix',
  '{z\\{as\\}z}/{_}/{z\\{df\\}z}',
  ['z{as}z', '_', 'z{df}z'],
  '{}/{}/{}'
);

addTestCaseWithExtraParams(
  'Complex case with lots of parameters',
  '\\}a/\\{b/\\{c\\}/\\{{d}\\}/\\{e{f}\\}/\\{{g}h\\}/\\{i{j}k\\}/{l\\}m}/{n\\}}/{\\}o}/{p\\{q}/{r\\{}/{\\{s}/{\\{t\\}}/{u\\{v\\}}/{\\{w\\}x}/{y\\{z\\}0}',
  ['d', 'f', 'g', 'j', 'l}m', 'n}', '}o', 'p{q', 'r{', '{s', '{t}', 'u{v}', '{w}x', 'y{z}0'],
  '\\}a/\\{b/\\{c\\}/\\{{}\\}/\\{e{}\\}/\\{{}h\\}/\\{i{}k\\}/{}/{}/{}/{}/{}/{}/{}/{}/{}/{}'
);

module.exports = { pathParamsTestCases: testCases };
