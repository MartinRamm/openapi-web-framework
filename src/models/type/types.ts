//TODO do this via folder structure
export const types = {
  //: Record<string, AbstractType<unknown, any>> = {
  string: {
    //metadata: minLength, maxLength
    any: {},
    password: {},
    enum: {}, //no metadata
    pattern: {},
    date: {}, //no metadata
    dateTime: {}, //no metadata
    time: {}, //no metadata
    duration: {}, //no metadata
    base64Encoded: {},
    binary: {},
    email: {},
    uuid: {}, //no metadata
    uri: {},
    ipv4: {}, //no metadata
    ipv6: {}, //no metadata
    jsonPointer: {},
    relativeJsonPointer: {},
    relativeJsonPointerOfSchema: {}, //checks that json pointer fits to a schema
  },
  number: {
    //metadata: minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf
    any: {},
    preciseInteger: {},
    preciseDecimal: {},
    float: {},
    double: {},
    integer: {},
    int32: {},
    int64: {},
  },
  boolean: {},
  array: {}, // metadata: minItems, maxItems, uniqueItems
  object: {
    //metadata: minProperties, maxProperties, additionalProperties
    any: {},
    typed: {},
    allOf: {},
    anyOf: {},
    oneOf: {},
  },
  any: {},
  oneOf: {}, //metadata: discriminator (https://swagger.io/docs/specification/data-models/inheritance-and-polymorphism/)
  not: {}, //check that it does not contain oneOf or not!!
};
