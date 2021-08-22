import { IsEmptyObject } from 'src/types/IsEmptyObject';
import { IsStringLiteral } from 'src/types/literals/IsStringLiteral';

export type AreNonLiteralKeysAllowed<T extends Record<any, any>> = IsEmptyObject<T> extends true // eslint-disable-line @typescript-eslint/no-explicit-any
  ? false //an empty object doesn't accept any keys
  : IsStringLiteral<keyof T> extends true
  ? false
  : true;
