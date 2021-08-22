import { IsEmptyObject } from 'src/types/IsEmptyObject';

export type AreAllPropertiesOptional<T extends Record<any, any>> = AreAllPropertiesOptionalHandleEmpty<true, T>; // eslint-disable-line @typescript-eslint/no-explicit-any

export type AreAllPropertiesOptionalHandleEmpty<
  AllowEmpty extends boolean,
  T extends Record<any, any> // eslint-disable-line @typescript-eslint/no-explicit-any
> = IsEmptyObject<T> extends true ? AllowEmpty : Record<string, never> extends T ? true : false;
