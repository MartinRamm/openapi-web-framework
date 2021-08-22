//TODO do this via folder structure
export const types = {
  //: Record<string, AbstractType<unknown, any>> = {
  string: {
    //metadata: minLength, maxLength
    any: {},
    date: {},
    dateTime: {},
    time: {},
    duration: {},
    password: {},
    base64Encoded: {},
    binary: {},
    email: {},
    idnEmail: {},
    uuid: {},
    uri: {},
    uriReference: {},
    uriTemplate: {},
    hostname: {},
    ipv4: {},
    ipv6: {},
    jsonPointer: {},
    relativeJsonPointer: {},
    relativeJsonPointerOfSchema: {}, //checks that json pointer fits to a schema
  },
  number: {
    //metadata: minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf
    any: {},
    float: {},
    double: {},
    integer: {},
    int32: {},
    long: {},
  },
  boolean: {},
  array: {}, // metadata: minItems, maxItems, uniqueItems
  untypedObject: {}, //metadata: minProperties, maxProperties
  any: {},
};
