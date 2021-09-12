const arrayCompareFn = <T>(a: Array<T>, b: Array<T>, compareFn: (a: T, b: T) => boolean): boolean =>
  a.length === b.length
  && a.every((_, index) => compareFn(a[index], b[index]));

export const arrayDeepEquals = arrayCompareFn;
export const arrayDeepEqualsPrimative = <T extends string | number | bigint | boolean | undefined | symbol | null>(a: Array<T>, b: Array<T>) => arrayCompareFn(a, b, (a: T, b: T) => a === b || (Number.isNaN(a) && Number.isNaN(b)))
