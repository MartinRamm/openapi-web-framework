// https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887
export type IsNever<T> = [T] extends [never] ? true : false;
