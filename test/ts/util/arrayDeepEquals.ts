import { arrayDeepEquals, arrayDeepEqualsPrimative } from '../../../src/util/arrayDeepEquals';

arrayDeepEqualsPrimative([1, 2, 3], [1, 2, 3]);
arrayDeepEqualsPrimative([true, true, false], [true, true, false]);
arrayDeepEqualsPrimative(['a', 'b', 'c'], ['a', 'b', 'c']);
arrayDeepEqualsPrimative([1, '2', 3], [1, '2', 3]);

// @ts-expect-error
arrayDeepEqualsPrimative([1, '2', {}], [1, '2', {}]);
// @ts-expect-error
arrayDeepEquals([1, '2', {}], [1, '2', {}]);
arrayDeepEquals([1, '2', {}], [1, '2', {}], (a, b) =>
  typeof a === 'object' && typeof b === 'object' ? arrayDeepEqualsPrimative(Object.keys(a), Object.keys(b)) : a === b
);
