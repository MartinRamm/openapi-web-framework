import { describe, expect, test } from '@jest/globals';
import { regexLastIndexOf } from '../../../src/util/regexpLastIndexOf';

describe('regexpLastIndexOf', () => {
  test.each([
    {name: 0, input: 'asdfasdfasdf', search: 'asdfasdfasdf', expected: 0},
    {name: 1, input: 'asdfasdfasdf', search: 'asdf', expected: 8},
    {name: 2, input: 'asdfasdfasdf', search: 'a', expected: 8},
    {name: 3, input: 'asdfasdfasdf', search: 's', expected: 9},
    {name: 4, input: 'asdfasdfasdf', search: 'd', expected: 10},
    {name: 5, input: 'asdfasdfasdf', search: 'f', expected: 11},
    {name: 6, input: 'asdfasdfasdf', search: 'g', expected: -1},
  ])('$name', ({input, search, expected}) => {
    const actual = regexLastIndexOf(input, new RegExp(search));
    expect(expected).toEqual(actual);
  })
})
