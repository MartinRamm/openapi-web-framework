let testCases = {};

const addTestCase = (name, input, expected) => {
  const testCase = (name, rawInput) => {
    testCases = {
      ...testCases,
      [name]: [
        { expected, name, subName: 'raw', input: rawInput },
        { expected, name, subName: 'postfix: slash', input: `${rawInput}/` },
        { expected, name, subName: 'prefix: slash', input: `/${rawInput}` },
        { expected, name, subName: 'pre- and postfix: slash', input: `/${rawInput}/` },
        { expected, name, subName: 'prefix: escaped {', input: `\\{${rawInput}` },
        { expected, name, subName: 'prefix: escaped }', input: `\\}${rawInput}` },
        { expected, name, subName: 'postfix: escaped {', input: `${rawInput}\\{` },
        { expected, name, subName: 'postfix: escaped }', input: `${rawInput}\\}` },
        { expected, name, subName: 'pre- and postfix: escaped brackets', input: `\\{${rawInput}\\}` },
        { expected, name, subName: 'pre- and postfix: escaped {', input: `\\{${rawInput}\\{` },
        { expected, name, subName: 'pre- and postfix: escaped }', input: `\\}${rawInput}\\}` },
      ],
    };
  };

  testCase(name, input);
  testCase(`${name} with path prefix`, `new/${input}`, expected);
  testCase(`${name} with path postfix`, `${input}/new`, expected);
  testCase(`${name} with path prefix and postfix`, `new/${input}/new`, expected);
};

addTestCase('no param', 'animal', []);

let expected = [];
let paramOnly = '';
let paramWithPrefix = '';
let paramWithPostfix = '';
let paramWithPreAndPostfix = '';
for (let i = 1; i <= 10; i++) {
  expected = [...expected, `param${i}`];

  paramOnly += i === 1 ? '' : '/';
  paramOnly += `{param${i}}`;
  addTestCase(`${i} param`, paramOnly, expected);

  paramWithPrefix += i === 1 ? '' : '/';
  paramWithPrefix += `prefix-{param${i}}`;
  addTestCase(`${i} prefixed param`, paramWithPrefix, expected);

  paramWithPostfix += i === 1 ? '' : '/';
  paramWithPostfix += `{param${i}}-postfix`;
  addTestCase(`${i} postfixed param`, paramWithPostfix, expected);

  paramWithPreAndPostfix += i === 1 ? '' : '/';
  paramWithPreAndPostfix += `prefix-{param${i}}-postfix`;
  addTestCase(`${i} pre- and postfixed param`, paramWithPreAndPostfix, expected);
}

const addTestCaseWithExtraParams = (name, input, expected) => {
  addTestCase(name, input, expected);
  let paramsString = '';
  let paramsArray = [];
  for (let i = 1; i <= 3; i++) {
    paramsString += i === 1 ? '' : '/';
    paramsString += `{_${i}}`;
    paramsArray = [...paramsArray, `_${i}`];

    addTestCase(`${i} param followed by ${name}`, `${paramsString}/${input}`, [...paramsArray, ...expected]);
    addTestCase(`${name} followed by ${i} param`, `${input}/${paramsString}`, [...expected, ...paramsArray]);
  }
};

addTestCaseWithExtraParams('escaped }', '\\}asdf', []);

addTestCaseWithExtraParams('escaped {', '\\{asdf', []);

addTestCaseWithExtraParams('escaped { and }', '\\{asdf\\}', []);

addTestCaseWithExtraParams('escaped param containing nested unescaped param', '\\{{as}\\}', ['as']);
addTestCaseWithExtraParams('2 escaped param containing nested unescaped param', '\\{{as}\\}/\\{{df}\\}', ['as', 'df']);

addTestCaseWithExtraParams('escaped param containing nested unescaped param with prefix', '\\{z{as}\\}', ['as']);
addTestCaseWithExtraParams('2 escaped param containing nested unescaped param with prefix', '\\{z{as}\\}/\\{z{df}\\}', [
  'as',
  'df',
]);

addTestCaseWithExtraParams('escaped param containing nested unescaped param with postfix', '\\{{as}z\\}', ['as']);
addTestCaseWithExtraParams(
  '2 escaped param containing nested unescaped param with postfix',
  '\\{{as}z\\}/\\{{df}z\\}',
  ['as', 'df']
);

addTestCaseWithExtraParams('escaped param containing nested unescaped param with pre- and postfix', '\\{z{as}z\\}', [
  'as',
]);
addTestCaseWithExtraParams(
  '2 escaped param containing nested unescaped param with pre- and postfix',
  '\\{z{as}z\\}/\\{z{df}z\\}',
  ['as', 'df']
);

addTestCaseWithExtraParams('param name containing escaped } in middle', '{as\\}df}', ['as}df']);
addTestCaseWithExtraParams('2 param name containing escaped } in middle', '{as\\}df}/{gh\\}ij}', ['as}df', 'gh}ij']);

addTestCaseWithExtraParams('param name containing escaped } at end', '{asdf\\}}', ['asdf}']);
addTestCaseWithExtraParams('2 param name containing escaped } at end', '{asdf\\}}/{ghij\\}}', ['asdf}', 'ghij}']);

addTestCaseWithExtraParams('param name containing escaped } at start', '{\\}asdf}', ['}asdf']);
addTestCaseWithExtraParams('2 param name containing escaped } at start', '{\\}asdf}/{\\}ghij}', ['}asdf', '}ghij']);

addTestCaseWithExtraParams('param name containing escaped { in middle', '{as\\{df}', ['as{df']);
addTestCaseWithExtraParams('2 param name containing escaped { in middle', '{as\\{df}/{gh\\{ij}', ['as{df', 'gh{ij']);

addTestCaseWithExtraParams('param name containing escaped { at end', '{asdf\\{}', ['asdf{']);
addTestCaseWithExtraParams('2 param name containing escaped { at end', '{asdf\\{}/{ghij\\{}', ['asdf{', 'ghij{']);

addTestCaseWithExtraParams('param name containing escaped { at start', '{\\{asdf}', ['{asdf']);
addTestCaseWithExtraParams('2 param name containing escaped { at start', '{\\{asdf}/{\\{ghij}', ['{asdf', '{ghij']);

addTestCaseWithExtraParams('param name containing escaped { and }', '{\\{as\\}}', ['{as}']);
addTestCaseWithExtraParams('2 param name containing escaped { and }', '{\\{as\\}}/{\\{df\\}}', ['{as}', '{df}']);

addTestCaseWithExtraParams('param name containing escaped { and } with prefix', '{z\\{as\\}}', ['z{as}']);
addTestCaseWithExtraParams('2 param name containing escaped { and } with prefix', '{z\\{as\\}}/{z\\{df\\}}', [
  'z{as}',
  'z{df}',
]);

addTestCaseWithExtraParams('param name containing escaped { and } with postfix', '{\\{as\\}z}', ['{as}z']);
addTestCaseWithExtraParams('2 param name containing escaped { and } with postfix', '{\\{as\\}z}/{\\{df\\}z}', [
  '{as}z',
  '{df}z',
]);

addTestCaseWithExtraParams('param name containing escaped { and } with pre- and postfix', '{z\\{as\\}z}', ['z{as}z']);
addTestCaseWithExtraParams(
  '2 param name containing escaped { and } with pre- and postfix',
  '{z\\{as\\}z}/{z\\{df\\}z}',
  ['z{as}z', 'z{df}z']
);

module.exports = { pathParamsTestCases: testCases };
