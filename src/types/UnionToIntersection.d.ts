/**
 *  This type converts a union type (e.g.: `A | B`) to a intersection type (e.g.: `A & B`).
 *  As seen on https://stackoverflow.com/a/59463385/2732818
 */
export type UnionToIntersection<T> = (T extends any ? (x: T) => 0 : never) extends (x: infer R) => 0 ? R : never;
