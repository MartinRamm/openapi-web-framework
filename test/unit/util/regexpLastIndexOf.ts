import { describe, expect, test } from '@jest/globals';
import { regexLastIndexOf } from '../../../src/util/regexpLastIndexOf';

const input = 'asdfgasdfasdfasdfasdfga';
describe('regexpLastIndexOf', () => {
  [
    { search: new RegExp(input), expected: input.lastIndexOf(input) },
    { search: /(?<=g)a/, expected: input.lastIndexOf('a') }, //positive lookbehind
    { search: /(?<!g)a/, expected: input.lastIndexOf('asdfga') }, //negative lookbehind
    { search: /asdf/, expected: input.lastIndexOf('asdf') },
    { search: /asdfasdf/, expected: input.lastIndexOf('asdfasdf') },
    { search: /a/, expected: input.lastIndexOf('a') },
    { search: /s/, expected: input.lastIndexOf('s') },
    { search: /d/, expected: input.lastIndexOf('d') },
    { search: /f/, expected: input.lastIndexOf('f') },
    { search: /h/, expected: input.lastIndexOf('h') },
    { search: /h/, expected: input.lastIndexOf('h') },
  ].forEach(({ search, expected }) => {
    test(`${input}: ${search.toString()}`, () => {
      const actual = regexLastIndexOf(input, search);
      expect(actual).toStrictEqual(expected);
    });
  });

  let testString = '';
  for (let i = 0; i < 10; i++) {
    testString += 'asdf';
    test(`${testString}: /asdfasdf/`, () => {
      const actual = regexLastIndexOf(testString, /asdfasdf/);
      const expected = testString.lastIndexOf('asdfasdf');
      expect(actual).toStrictEqual(expected);
    });
  }
});
