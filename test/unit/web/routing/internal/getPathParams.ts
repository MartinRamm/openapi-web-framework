import { describe, expect, test } from '@jest/globals';
import { getPathParams } from 'src/web/routing/internal/getPathParams';
import { pathParamsTestCases } from '../../../../shared/web/routing/internal/pathParamsTestCases';

describe('getPathParams', () => {
  Object.entries(pathParamsTestCases).forEach(([name, tests]) => {
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
