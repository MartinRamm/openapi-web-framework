import { numberAny } from 'src/models/type/internal/typeCategory/numberAny';
import { numberInteger } from 'src/models/type/internal/typeCategory/numberInteger';
import { numberDecimal } from 'src/models/type/internal/typeCategory/numberDecimal';
import { anyTypeCategory } from 'src/models/type/internal/typeCategory/anyTypeCategory';
import { stringAny } from 'src/models/type/internal/typeCategory/stringAny';
import { stringEnum } from 'src/models/type/internal/typeCategory/stringEnum';
import { stringPattern } from 'src/models/type/internal/typeCategory/stringPattern';
import { boolean } from 'src/models/type/internal/typeCategory/boolean';
import { array } from 'src/models/type/internal/typeCategory/array';

export const typeCategory = {
  any: anyTypeCategory,
  string: {
    any: stringAny,
    enum: stringEnum,
    pattern: stringPattern,
  },
  number: {
    any: numberAny,
    integer: numberInteger,
    decimal: numberDecimal,
  },
  boolean: boolean,
  array: array,
  object: true,
  not: true,
  oneOf: true,
};
