import { describe, expect, test } from '@jest/globals';
import { arrayDeepEquals, arrayDeepEqualsPrimative } from 'src/util/arrayDeepEquals';

class TestObj {
  constructor(public readonly value: number) {}
}

const compareFnTestObj = (a: TestObj, b: TestObj) => a.value === b.value;

describe('arrayDeepEquals', () => {
  describe('positive test cases', () => {
    test('primative', () => {
      const a = [1,2,3];
      const b = [1,2,3];

      const actual = arrayDeepEqualsPrimative(a, b);
      expect(actual).toStrictEqual(true);
    });

    test('complex', () => {
      const a = [new TestObj(0), new TestObj(1), new TestObj(2)];
      const b = [new TestObj(0), new TestObj(1), new TestObj(2)];

      const actual = arrayDeepEquals(a, b, compareFnTestObj);
      expect(actual).toStrictEqual(true);
    });
  });

  describe('order matters', () => {
    test('primative', () => {
      const a = [1,2,3];
      const b = [3,2,1];

      const actual = arrayDeepEqualsPrimative(a, b);
      expect(actual).toStrictEqual(false);
    });

    test('complex', () => {
      const a = [new TestObj(0), new TestObj(1), new TestObj(2)];
      const b = [new TestObj(3), new TestObj(2), new TestObj(1)];

      const actual = arrayDeepEquals(a, b, compareFnTestObj);
      expect(actual).toStrictEqual(false);
    });
  });

  describe('different length', () => {
    describe('primative', () => {
      const a = [1,2,3];
      const b = [1,2];

      const testCases: Array<[string, number[], number[]]> = [
        ['long short', a, b],
        ['short long', b, a],
        ['empty non-empty', [], a],
        ['non-empty empty', b, []],
      ];
      testCases.forEach(([name, a, b]) => {
        test(name, () => {
          const actual = arrayDeepEqualsPrimative(a, b);
          expect(actual).toStrictEqual(false);
        });
      });
    });
    describe('complex', () => {
      const a = [new TestObj(0), new TestObj(1), new TestObj(2)];
      const b = [new TestObj(0), new TestObj(1)];

      const testCases: Array<[string, TestObj[], TestObj[]]> = [
        ['long short', a, b],
        ['short long', b, a],
        ['empty non-empty', [], a],
        ['non-empty empty', b, []],
      ];
      testCases.forEach(([name, a, b]) => {
        test(name, () => {
          const actual = arrayDeepEquals(a, b, compareFnTestObj);
          expect(actual).toStrictEqual(false);
        });
      });
    });
  });
});
