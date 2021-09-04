import { describe, expect, test } from '@jest/globals';
import { getPathParams } from 'src/web/routing/internal/getPathParams';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const testCases = require('../../../../shared/web/routing/internal/getPathParamsTestCases') as Record<
  string,
  Array<{ subName: string; input: string; expected: string[] }>
>;

describe('getPathParams', () => {
  Object.entries(testCases).forEach(([name, tests]) => {
    describe(name, () => {
      tests.forEach(({ subName, input, expected }) => {
        test(`${subName}: getPathParams('${input}')`, () => {
          const actual = getPathParams(input);
          expect(actual).toStrictEqual(expected);
        });
      });
    });
  });
});
