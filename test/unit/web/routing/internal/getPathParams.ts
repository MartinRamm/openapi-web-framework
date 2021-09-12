import { describe, expect, test } from '@jest/globals';
import { getPathParams } from 'src/web/routing/internal/getPathParams';
import { pathParamsTestCases } from 'test/shared/web/routing/internal/pathParamsTestCases';

describe('getPathParams', () => {
  Object.entries(pathParamsTestCases).forEach(([name, tests]) => {
    describe(name, () => {
      tests.forEach(({ subName, input, expectedParams }) => {
        test(`${subName}: getPathParams('${input.replace(/\\/g, '\\\\')}')`, () => {
          const actual = getPathParams(input);
          expect(actual).toStrictEqual(expectedParams);
        });
      });
    });
  });
});
