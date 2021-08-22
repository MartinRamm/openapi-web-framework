//as per https://github.com/microsoft/TypeScript/issues/32562#issuecomment-515235948

type Identity<T> = T;

export type Evaluate<T> = T extends any ? Identity<{ [k in keyof T]: T[k] }> : never; // eslint-disable-line @typescript-eslint/no-explicit-any
