import { IsNever } from 'expect-type';

export type IsEmptyObject<O extends Record<any, any>> = IsNever<keyof O> extends true ? true : IsNever<O[keyof O]>; // eslint-disable-line @typescript-eslint/no-explicit-any
