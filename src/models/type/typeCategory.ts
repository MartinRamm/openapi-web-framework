import { numberAny } from 'src/models/type/internal/type-category/numberAny';
import { numberInteger } from 'src/models/type/internal/type-category/numberInteger';
import { numberDecimal } from 'src/models/type/internal/type-category/numberDecimal';
import { anyTypeCategory } from 'src/models/type/internal/type-category/anyTypeCategory';
import { stringAny } from 'src/models/type/internal/type-category/stringAny';
import { stringEnum } from 'src/models/type/internal/type-category/stringEnum';
import { stringPattern } from 'src/models/type/internal/type-category/stringPattern';
import { boolean } from 'src/models/type/internal/type-category/boolean';
import { array } from 'src/models/type/internal/type-category/array';
import { oneOf } from 'src/models/type/internal/type-category/oneOf';
import { notOneOf } from 'src/models/type/internal/type-category/notOneOf';
import { object } from 'src/models/type/internal/type-category/object';

export const typeCategory = Object.freeze({
  any: anyTypeCategory,
  string: Object.freeze({
    any: stringAny,
    enum: stringEnum,
    pattern: stringPattern,
  }),
  number: Object.freeze({
    any: numberAny,
    integer: numberInteger,
    decimal: numberDecimal,
  }),
  boolean: boolean,
  array: array,
  object: object, //TODO
  oneOf: oneOf,
  notOneOf: notOneOf,
});
