import { describe, expect, test } from '@jest/globals';
import { pathParamsTestCases } from 'test/shared/web/routing/internal/pathParamsTestCases';
import { getPathWithoutParamNames } from '../../../../../src/web/routing/internal/getPathWithoutParamNames';

describe('getPathWithoutParamNames', () => {
  Object.entries(pathParamsTestCases).forEach(([name, tests]) => {
    describe(name, () => {
      tests.forEach(({ subName, input, expectedPathWithoutParams }) => {
        test(`${subName}: getPathWithoutParamNames('${input.replace(/\\/g, '\\\\')}')`, () => {
          const actual = getPathWithoutParamNames(input);
          expect(actual).toStrictEqual(expectedPathWithoutParams);
        });
      });
    });
  });
});
