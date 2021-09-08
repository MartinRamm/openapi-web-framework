import { describe, expect, test } from '@jest/globals';
import { regexLastIndexOf } from '../../../src/util/regexpLastIndexOf';

const input = 'asdfgasdfasdfasdfga';
describe('regexpLastIndexOf', () => {
  [
    { search: new RegExp(input), expected: 0 },
    { search: /(?<=g)a/, expected: 18 }, //positive lookbehind
    { search: /(?<!g)a/, expected: 13 }, //negative lookbehind
    { search: /asdf/, expected: 13 },
    { search: /a/, expected: 18 },
    { search: /s/, expected: 14 },
    { search: /d/, expected: 15 },
    { search: /f/, expected: 16 },
    { search: /h/, expected: -1 },
  ].forEach(({ search, expected }) => {
    test(search.toString(), () => {
      const actual = regexLastIndexOf(input, search);
      expect(actual).toStrictEqual(expected);
    });
  });
});
