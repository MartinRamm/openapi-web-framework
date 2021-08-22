import { AbstractType } from 'src/models/type/internal/AbstractType';
import { Schema } from 'src/models/schema/Schema';
import { expectTypeOf } from 'expect-type';
import { IsEmptyObject } from 'src/types/IsEmptyObject';
import { SchemaToTypescriptType } from 'src/models/schema/to-typescript/SchemaToTypescriptType';
import { ReadonlySchemaToTypescriptType } from 'src/models/schema/to-typescript/ReadonlySchemaToTypescriptType';
import { WriteonlySchemaToTypescriptType } from 'src/models/schema/to-typescript/WriteonlySchemaToTypescriptType';

//TODO replace with real implementation
const Types = {
  string: {
    any: {} as unknown as AbstractType<string, {}>, // eslint-disable-line @typescript-eslint/ban-types
    readonly: {} as unknown as AbstractType<string, { readonly: true }>, // eslint-disable-line @typescript-eslint/ban-types
    writeonly: {} as unknown as AbstractType<string, { writeonly: true }>, // eslint-disable-line @typescript-eslint/ban-types
  },
  number: {
    any: {} as unknown as AbstractType<number, {}>, // eslint-disable-line @typescript-eslint/ban-types
    readonly: {} as unknown as AbstractType<number, { readonly: true }>, // eslint-disable-line @typescript-eslint/ban-types
    writeonly: {} as unknown as AbstractType<number, { writeonly: true }>, // eslint-disable-line @typescript-eslint/ban-types
  },
};

//Test case 0: simple, non-nested object
const Schema0 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
  },
  {}
);
type Schema0Expected = {
  string: string;
  number: number;
};
type Schema0SchemaActual = SchemaToTypescriptType<typeof Schema0>;
expectTypeOf<Schema0SchemaActual>().toEqualTypeOf<Schema0Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema0SchemaActual['notInSchema']>();

type Schema0ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema0>;
expectTypeOf<Schema0ReadonlyActual>().toEqualTypeOf<Schema0Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema0ReadonlyActual['notInSchema']>();

type Schema0WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema0>;
expectTypeOf<Schema0WriteonlyActual>().toEqualTypeOf<Schema0Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema0WriteonlyActual['notInSchema']>();

//Test case 1: simple, non-nested object with different read/write status
const Schema1 = new Schema(
  {
    string: Types.string.any,
    stringReadonly: Types.string.readonly,
    stringWriteonly: Types.string.writeonly,
    number: Types.number.any,
    numberReadonly: Types.number.readonly,
    numberWriteonly: Types.number.writeonly,
  },
  {}
);

type Schema1Expected = {
  string: string;
  stringReadonly?: string;
  stringWriteonly?: string;
  number: number;
  numberReadonly?: number;
  numberWriteonly?: number;
};
type Schema1Actual = SchemaToTypescriptType<typeof Schema1>;
expectTypeOf<Schema1Actual>().toEqualTypeOf<Schema1Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema1Actual['notInSchema']>();

type Schema1ExpectedReadonly = {
  string: string;
  stringReadonly: string;
  number: number;
  numberReadonly: number;
};
type Schema1ActualReadonly = ReadonlySchemaToTypescriptType<typeof Schema1>;
expectTypeOf<Schema1ActualReadonly>().toEqualTypeOf<Schema1ExpectedReadonly>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema1ActualReadonly['notInSchema']>();

type Schema1ExpectedWriteonly = {
  string: string;
  stringWriteonly: string;
  number: number;
  numberWriteonly: number;
};
type Schema1ActualWriteonly = WriteonlySchemaToTypescriptType<typeof Schema1>;
expectTypeOf<Schema1ActualWriteonly>().toEqualTypeOf<Schema1ExpectedWriteonly>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema1ActualWriteonly['notInSchema']>();

//Test case 2: Simple, nesed object (nesting as object)
const Schema2 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nested: {
      string: Types.string.any,
      number: Types.number.any,
      nested: {
        string: Types.string.any,
        number: Types.number.any,
      },
    },
  },
  {}
);
type Schema2Expected = {
  string: string;
  number: number;
  nested: {
    string: string;
    number: number;
    nested: {
      string: string;
      number: number;
    };
  };
};
type Schema2SchemaActual = SchemaToTypescriptType<typeof Schema2>;
expectTypeOf<Schema2SchemaActual>().toEqualTypeOf<Schema2Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema2SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema2SchemaActual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema2SchemaActual['nested']['nested']['notInSchema']>();

type Schema2ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema2>;
expectTypeOf<Schema2ReadonlyActual>().toEqualTypeOf<Schema2Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema2ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema2ReadonlyActual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema2ReadonlyActual['nested']['nested']['notInSchema']>();

type Schema2WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema2>;
expectTypeOf<Schema2WriteonlyActual>().toEqualTypeOf<Schema2Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema2WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema2WriteonlyActual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema2WriteonlyActual['nested']['nested']['notInSchema']>();

//Test case 3: Simple, nesed object (nesting as Schema)
const Schema3 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nested: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
        nested: new Schema(
          {
            string: Types.string.any,
            number: Types.number.any,
          },
          {}
        ),
      },
      {}
    ),
  },
  {}
);
type Schema3Expected = {
  string: string;
  number: number;
  nested: {
    string: string;
    number: number;
    nested: {
      string: string;
      number: number;
    };
  };
};
type Schema3SchemaActual = SchemaToTypescriptType<typeof Schema3>;
expectTypeOf<Schema3SchemaActual>().toEqualTypeOf<Schema3Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema3SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema3SchemaActual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema3SchemaActual['nested']['nested']['notInSchema']>();

type Schema3ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema3>;
expectTypeOf<Schema3ReadonlyActual>().toEqualTypeOf<Schema3Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema3ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema3ReadonlyActual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema3ReadonlyActual['nested']['nested']['notInSchema']>();

type Schema3WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema3>;
expectTypeOf<Schema3WriteonlyActual>().toEqualTypeOf<Schema3Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema3WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema3WriteonlyActual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema3WriteonlyActual['nested']['nested']['notInSchema']>();

//Test case 4: Nnested object with different read/write status (nesting as object)
const Schema4 = new Schema(
  {
    string: Types.string.any,
    stringReadonly: Types.string.readonly,
    stringWriteonly: Types.string.writeonly,
    number: Types.number.any,
    numberReadonly: Types.number.readonly,
    numberWriteonly: Types.number.writeonly,
    nested: {
      string: Types.string.any,
      stringReadonly: Types.string.readonly,
      stringWriteonly: Types.string.writeonly,
      number: Types.number.any,
      numberReadonly: Types.number.readonly,
      numberWriteonly: Types.number.writeonly,
      nested: {
        string: Types.string.any,
        stringReadonly: Types.string.readonly,
        stringWriteonly: Types.string.writeonly,
        number: Types.number.any,
        numberReadonly: Types.number.readonly,
        numberWriteonly: Types.number.writeonly,
      },
    },
  },
  {}
);

type Schema4Expected = {
  string: string;
  stringReadonly?: string;
  stringWriteonly?: string;
  number: number;
  numberReadonly?: number;
  numberWriteonly?: number;
  nested: {
    string: string;
    stringReadonly?: string;
    stringWriteonly?: string;
    number: number;
    numberReadonly?: number;
    numberWriteonly?: number;
    nested: {
      string: string;
      stringReadonly?: string;
      stringWriteonly?: string;
      number: number;
      numberReadonly?: number;
      numberWriteonly?: number;
    };
  };
};
type Schema4Actual = SchemaToTypescriptType<typeof Schema4>;
expectTypeOf<Schema4Actual>().toEqualTypeOf<Schema4Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema4Actual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema4Actual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema4Actual['nested']['nested']['notInSchema']>();

type Schema4ExpectedReadonly = {
  string: string;
  stringReadonly: string;
  number: number;
  numberReadonly: number;
  nested: {
    string: string;
    stringReadonly: string;
    number: number;
    numberReadonly: number;
    nested: {
      string: string;
      stringReadonly: string;
      number: number;
      numberReadonly: number;
    };
  };
};
type Schema4ActualReadonly = ReadonlySchemaToTypescriptType<typeof Schema4>;
expectTypeOf<Schema4ActualReadonly>().toEqualTypeOf<Schema4ExpectedReadonly>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema4ActualReadonly['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema4ActualReadonly['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema4ActualReadonly['nested']['nested']['notInSchema']>();

type Schema4ExpectedWriteonly = {
  string: string;
  stringWriteonly: string;
  number: number;
  numberWriteonly: number;
  nested: {
    string: string;
    stringWriteonly: string;
    number: number;
    numberWriteonly: number;
    nested: {
      string: string;
      stringWriteonly: string;
      number: number;
      numberWriteonly: number;
    };
  };
};
type Schema4ActualWriteonly = WriteonlySchemaToTypescriptType<typeof Schema4>;
expectTypeOf<Schema4ActualWriteonly>().toEqualTypeOf<Schema4ExpectedWriteonly>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema4ActualWriteonly['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema4ActualWriteonly['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema4ActualWriteonly['nested']['nested']['notInSchema']>();

//Test case 4: Nnested object with different read/write status (nesting as Schema)
const Schema5 = new Schema(
  {
    string: Types.string.any,
    stringReadonly: Types.string.readonly,
    stringWriteonly: Types.string.writeonly,
    number: Types.number.any,
    numberReadonly: Types.number.readonly,
    numberWriteonly: Types.number.writeonly,
    nested: new Schema(
      {
        string: Types.string.any,
        stringReadonly: Types.string.readonly,
        stringWriteonly: Types.string.writeonly,
        number: Types.number.any,
        numberReadonly: Types.number.readonly,
        numberWriteonly: Types.number.writeonly,
        nested: new Schema(
          {
            string: Types.string.any,
            stringReadonly: Types.string.readonly,
            stringWriteonly: Types.string.writeonly,
            number: Types.number.any,
            numberReadonly: Types.number.readonly,
            numberWriteonly: Types.number.writeonly,
          },
          {}
        ),
      },
      {}
    ),
  },
  {}
);

type Schema5Expected = {
  string: string;
  stringReadonly?: string;
  stringWriteonly?: string;
  number: number;
  numberReadonly?: number;
  numberWriteonly?: number;
  nested: {
    string: string;
    stringReadonly?: string;
    stringWriteonly?: string;
    number: number;
    numberReadonly?: number;
    numberWriteonly?: number;
    nested: {
      string: string;
      stringReadonly?: string;
      stringWriteonly?: string;
      number: number;
      numberReadonly?: number;
      numberWriteonly?: number;
    };
  };
};
type Schema5Actual = SchemaToTypescriptType<typeof Schema5>;
expectTypeOf<Schema5Actual>().toEqualTypeOf<Schema5Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema5Actual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema5Actual['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema5Actual['nested']['nested']['notInSchema']>();

type Schema5ExpectedReadonly = {
  string: string;
  stringReadonly: string;
  number: number;
  numberReadonly: number;
  nested: {
    string: string;
    stringReadonly: string;
    number: number;
    numberReadonly: number;
    nested: {
      string: string;
      stringReadonly: string;
      number: number;
      numberReadonly: number;
    };
  };
};
type Schema5ActualReadonly = ReadonlySchemaToTypescriptType<typeof Schema5>;
expectTypeOf<Schema5ActualReadonly>().toEqualTypeOf<Schema5ExpectedReadonly>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema5ActualReadonly['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema5ActualReadonly['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema5ActualReadonly['nested']['nested']['notInSchema']>();

type Schema5ExpectedWriteonly = {
  string: string;
  stringWriteonly: string;
  number: number;
  numberWriteonly: number;
  nested: {
    string: string;
    stringWriteonly: string;
    number: number;
    numberWriteonly: number;
    nested: {
      string: string;
      stringWriteonly: string;
      number: number;
      numberWriteonly: number;
    };
  };
};
type Schema5ActualWriteonly = WriteonlySchemaToTypescriptType<typeof Schema5>;
expectTypeOf<Schema5ActualWriteonly>().toEqualTypeOf<Schema5ExpectedWriteonly>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema5ActualWriteonly['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema5ActualWriteonly['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema5ActualWriteonly['nested']['nested']['notInSchema']>();

//Test case 6: simple, non-nested object with additionalProperties: true
const Schema6 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
  },
  { additionalProperties: true }
);
type Schema6Expected = {
  [x: string]: unknown;
  string: string;
  number: number;
};
type Schema6SchemaActual = SchemaToTypescriptType<typeof Schema6>;
expectTypeOf<Schema6SchemaActual>().toEqualTypeOf<Schema6Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema6SchemaActual['notInSchema']>().toBeUnknown();

type Schema6ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema6>;
expectTypeOf<Schema6ReadonlyActual>().toEqualTypeOf<Schema6Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema6ReadonlyActual['notInSchema']>().toBeUnknown();

type Schema6WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema6>;
expectTypeOf<Schema6WriteonlyActual>().toEqualTypeOf<Schema6Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema6WriteonlyActual['notInSchema']>().toBeUnknown();

//Test case 7: Nested object with additionalProperties: true while root Schema has additionalProperties set to false
const Schema7 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nested: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { additionalProperties: true }
    ),
  },
  {}
);
type Schema7Expected = {
  string: string;
  number: number;
  nested: {
    string: string;
    number: number;
    [key: string]: unknown;
  };
};
type Schema7SchemaActual = SchemaToTypescriptType<typeof Schema7>;
expectTypeOf<Schema7SchemaActual>().toEqualTypeOf<Schema7Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema7SchemaActual['notInSchema']>();
expectTypeOf<Schema7SchemaActual['nested']['notInSchema']>().toBeUnknown();

type Schema7ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema7>;
expectTypeOf<Schema7ReadonlyActual>().toEqualTypeOf<Schema7Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema7ReadonlyActual['notInSchema']>();
expectTypeOf<Schema7ReadonlyActual['nested']['notInSchema']>().toBeUnknown();

type Schema7WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema7>;
expectTypeOf<Schema7WriteonlyActual>().toEqualTypeOf<Schema7Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema7WriteonlyActual['notInSchema']>();
expectTypeOf<Schema7WriteonlyActual['nested']['notInSchema']>().toBeUnknown();

//Test case 8: Deeply nested object with additionalProperties: true
const Schema8 = new Schema(
  {
    deeply: {
      nested: {
        object: {
          string: Types.string.any,
          number: Types.number.any,
          nested: new Schema(
            {
              string: Types.string.any,
              number: Types.number.any,
            },
            { additionalProperties: true }
          ),
        },
      },
    },
  },
  {}
);
type Schema8Expected = {
  deeply: {
    nested: {
      object: {
        string: string;
        number: number;
        nested: {
          [key: string]: unknown;
          string: string;
          number: number;
        };
      };
    };
  };
};
type Schema8SchemaActual = SchemaToTypescriptType<typeof Schema8>;
expectTypeOf<Schema8SchemaActual>().toEqualTypeOf<Schema8Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema8SchemaActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema8SchemaActual['deeply']['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema8SchemaActual['deeply']['nested']['object']['notInSchema']>();
expectTypeOf<Schema8SchemaActual['deeply']['nested']['object']['nested']['notInSchema']>().toBeUnknown();

type Schema8ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema8>;
expectTypeOf<Schema8ReadonlyActual>().toEqualTypeOf<Schema8Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema8ReadonlyActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema8ReadonlyActual['deeply']['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema8ReadonlyActual['deeply']['nested']['object']['notInSchema']>();
expectTypeOf<Schema8ReadonlyActual['deeply']['nested']['object']['nested']['notInSchema']>().toBeUnknown();

type Schema8WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema8>;
expectTypeOf<Schema8WriteonlyActual>().toEqualTypeOf<Schema8Expected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema8WriteonlyActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema8WriteonlyActual['deeply']['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema8WriteonlyActual['deeply']['nested']['object']['notInSchema']>();
expectTypeOf<Schema8WriteonlyActual['deeply']['nested']['object']['nested']['notInSchema']>().toBeUnknown();

//Test case 9 (nested as object):
//    Nested object with readonly/writeonly filtering that causes a nested object to potentially be empty causes the
//      key to become optional when using `SchemaToTypescriptType`
//    Nested object with readonly/writeonly filtering that causes a nested object to be empty removes the whole object
//      when using `ReadonlySchemaToTypescriptType` or `WriteonlySchemaToTypescriptType`
const Schema9 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nestedReadonly: {
      string: Types.string.readonly,
      number: Types.number.readonly,
    },
    nestedWriteonly: {
      string: Types.string.writeonly,
      number: Types.number.writeonly,
    },
  },
  {}
);

type Schema9SchemaExpected = {
  string: string;
  number: number;
  nestedReadonly?: {
    string?: string;
    number?: number;
  };
  nestedWriteonly?: {
    string?: string;
    number?: number;
  };
};
type Schema9SchemaActual = SchemaToTypescriptType<typeof Schema9>;
expectTypeOf<Schema9SchemaActual>().toEqualTypeOf<Schema9SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema9SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema9SchemaActual['nestedReadonly']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema9SchemaActual['nestedWriteonly']['notInSchema']>();

type Schema9ReadonlyExpected = {
  string: string;
  number: number;
  nestedReadonly: {
    string: string;
    number: number;
  };
};
type Schema9ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema9>;
expectTypeOf<Schema9ReadonlyActual>().toEqualTypeOf<Schema9ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema9ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema9ReadonlyActual['nestedReadonly']['notInSchema']>();

type Schema9WriteonlyExpected = {
  string: string;
  number: number;
  nestedWriteonly: {
    string: string;
    number: number;
  };
};
type Schema9WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema9>;
expectTypeOf<Schema9WriteonlyActual>().toEqualTypeOf<Schema9WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema9WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema9WriteonlyActual['nestedWriteonly']['notInSchema']>();

//Test case 10
//    Nested Schema with readonly/writeonly filtering that causes a nested object to potentially be empty causes the
//      key to become optional when using `SchemaToTypescriptType`
//    Nested Schema with readonly/writeonly filtering that causes a nested object to be empty removes the whole object
//      when using `ReadonlySchemaToTypescriptType` or `WriteonlySchemaToTypescriptType`
const Schema10 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nestedReadonly: new Schema(
      {
        string: Types.string.readonly,
        number: Types.number.readonly,
      },
      {}
    ),
    nestedWriteonly: new Schema(
      {
        string: Types.string.writeonly,
        number: Types.number.writeonly,
      },
      {}
    ),
  },
  {}
);

type Schema10SchemaExpected = {
  string: string;
  number: number;
  nestedReadonly?: {
    string?: string;
    number?: number;
  };
  nestedWriteonly?: {
    string?: string;
    number?: number;
  };
};
type Schema10SchemaActual = SchemaToTypescriptType<typeof Schema10>;
expectTypeOf<Schema10SchemaActual>().toEqualTypeOf<Schema10SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema10SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema10SchemaActual['nestedReadonly']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema10SchemaActual['nestedWriteonly']['notInSchema']>();

type Schema10ReadonlyExpected = {
  string: string;
  number: number;
  nestedReadonly: {
    string: string;
    number: number;
  };
};
type Schema10ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema10>;
expectTypeOf<Schema10ReadonlyActual>().toEqualTypeOf<Schema10ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema10ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema10ReadonlyActual['nestedReadonly']['notInSchema']>();

type Schema10WriteonlyExpected = {
  string: string;
  number: number;
  nestedWriteonly: {
    string: string;
    number: number;
  };
};
type Schema10WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema10>;
expectTypeOf<Schema10WriteonlyActual>().toEqualTypeOf<Schema10WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema10WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema10WriteonlyActual['nestedWriteonly']['notInSchema']>();

//Test case 11
//    Nested Schema with readonly/writeonly filtering that causes a nested Schema with `additionalProperties` set to
//        true to potentially be empty causes the key to become optional when using `SchemaToTypescriptType`.
//    Nested Schema with readonly/writeonly filtering that causes a nested Schema with `additionalProperties` set to
//        true to be empty removes the whole object when using `ReadonlySchemaToTypescriptType` or
//        `WriteonlySchemaToTypescriptType`.
const Schema11 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nestedReadonly: new Schema(
      {
        string: Types.string.readonly,
        number: Types.number.readonly,
      },
      { additionalProperties: true }
    ),
    nestedWriteonly: new Schema(
      {
        string: Types.string.writeonly,
        number: Types.number.writeonly,
      },
      { additionalProperties: true }
    ),
  },
  {}
);

type Schema11SchemaExpected = {
  string: string;
  number: number;
  nestedReadonly?: {
    [key: string]: unknown;
    string?: string;
    number?: number;
  };
  nestedWriteonly?: {
    [key: string]: unknown;
    string?: string;
    number?: number;
  };
};
type Schema11SchemaActual = SchemaToTypescriptType<typeof Schema11>;
expectTypeOf<Schema11SchemaActual>().toEqualTypeOf<Schema11SchemaExpected>();
expectTypeOf<Required<Schema11ReadonlyActual>['nestedWriteonly']['notInSchema']>().toBeUnknown;
expectTypeOf<Required<Schema11WriteonlyActual>['nestedReadonly']['notInSchema']>().toBeUnknown;

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema11SchemaActual['notInSchema']>();
expectTypeOf<Required<Schema11SchemaActual>['nestedReadonly']['notInSchema']>().toBeUnknown();
expectTypeOf<Required<Schema11SchemaActual>['nestedWriteonly']['notInSchema']>().toBeUnknown();

type Schema11ReadonlyExpected = {
  string: string;
  number: number;
  nestedReadonly: {
    [key: string]: unknown;
    string: string;
    number: number;
  };
  nestedWriteonly?: {
    [key: string]: unknown;
  };
};
type Schema11ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema11>;
expectTypeOf<Schema11ReadonlyActual>().toEqualTypeOf<Schema11ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema11ReadonlyActual['notInSchema']>();
expectTypeOf<Schema11ReadonlyActual['nestedReadonly']['notInSchema']>().toBeUnknown();
expectTypeOf<Required<Schema11ReadonlyActual>['nestedWriteonly']['notInSchema']>().toBeUnknown;

type Schema11WriteonlyExpected = {
  string: string;
  number: number;
  nestedWriteonly: {
    [key: string]: unknown;
    string: string;
    number: number;
  };
  nestedReadonly?: {
    [key: string]: unknown;
  };
};
type Schema11WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema11>;
expectTypeOf<Schema11WriteonlyActual>().toEqualTypeOf<Schema11WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema11WriteonlyActual['notInSchema']>();
expectTypeOf<Schema11WriteonlyActual['nestedWriteonly']['notInSchema']>().toBeUnknown();
expectTypeOf<Required<Schema11WriteonlyActual>['nestedReadonly']['notInSchema']>().toBeUnknown;

//Test case 12: Setting nested Schemas to readonly/writeonly
const Schema12 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nestedReadonly: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { readonly: true }
    ),
    nestedWriteonly: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { writeonly: true }
    ),
  },
  {}
);

type Schema12SchemaExpected = {
  string: string;
  number: number;
  nestedReadonly?: {
    string: string;
    number: number;
  };
  nestedWriteonly?: {
    string: string;
    number: number;
  };
};
type Schema12SchemaActual = SchemaToTypescriptType<typeof Schema12>;
expectTypeOf<Schema12SchemaActual>().toEqualTypeOf<Schema12SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema12SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema12SchemaActual['nestedReadonly']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema12SchemaActual['nestedWriteonly']['notInSchema']>();

type Schema12ReadonlyExpected = {
  string: string;
  number: number;
  nestedReadonly: {
    string: string;
    number: number;
  };
};
type Schema12ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema12>;
expectTypeOf<Schema12ReadonlyActual>().toEqualTypeOf<Schema12ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema12ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema12ReadonlyActual['nestedReadonly']['notInSchema']>();

type Schema12WriteonlyExpected = {
  string: string;
  number: number;
  nestedWriteonly: {
    string: string;
    number: number;
  };
};
type Schema12WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema12>;
expectTypeOf<Schema12WriteonlyActual>().toEqualTypeOf<Schema12WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema12WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema12WriteonlyActual['nestedWriteonly']['notInSchema']>();

//Test case 13: Setting nested Schemas to readonly/writeonly and additionalProperties
const Schema13 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nestedReadonly: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { readonly: true, additionalProperties: true }
    ),
    nestedWriteonly: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { writeonly: true, additionalProperties: true }
    ),
  },
  {}
);

type Schema13SchemaExpected = {
  string: string;
  number: number;
  nestedReadonly?: {
    [key: string]: unknown;
    string: string;
    number: number;
  };
  nestedWriteonly?: {
    [key: string]: unknown;
    string: string;
    number: number;
  };
};
type Schema13SchemaActual = SchemaToTypescriptType<typeof Schema13>;
expectTypeOf<Schema13SchemaActual>().toEqualTypeOf<Schema13SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema13SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema13SchemaActual['nestedReadonly']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema13SchemaActual['nestedWriteonly']['notInSchema']>();

type Schema13ReadonlyExpected = {
  string: string;
  number: number;
  nestedReadonly: {
    [key: string]: unknown;
    string: string;
    number: number;
  };
};
type Schema13ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema13>;
expectTypeOf<Schema13ReadonlyActual>().toEqualTypeOf<Schema13ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema13ReadonlyActual['notInSchema']>();
expectTypeOf<Schema13ReadonlyActual['nestedReadonly']['notInSchema']>().toBeUnknown();

type Schema13WriteonlyExpected = {
  string: string;
  number: number;
  nestedWriteonly: {
    [key: string]: unknown;
    string: string;
    number: number;
  };
};
type Schema13WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema13>;
expectTypeOf<Schema13WriteonlyActual>().toEqualTypeOf<Schema13WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema13WriteonlyActual['notInSchema']>();
expectTypeOf<Schema13WriteonlyActual['nestedWriteonly']['notInSchema']>().toBeUnknown();

//Test case 14: simple, non-nested object with readonly
const Schema14 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
  },
  { readonly: true }
);
type Schema14SchemaExpected = {
  string?: string;
  number?: number;
};
type Schema14SchemaActual = SchemaToTypescriptType<typeof Schema14>;
expectTypeOf<Schema14SchemaActual>().toEqualTypeOf<Schema14SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema14SchemaActual['notInSchema']>();

type Schema14ReadonlyExpected = {
  string: string;
  number: number;
};
type Schema14ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema14>;
expectTypeOf<Schema14ReadonlyActual>().toEqualTypeOf<Schema14ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema14ReadonlyActual['notInSchema']>();

type Schema14WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema14>;
expectTypeOf<IsEmptyObject<Schema14WriteonlyActual>>().toEqualTypeOf<true>();

//Test case 15: simple, non-nested object with writeonly
const Schema15 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
  },
  { writeonly: true }
);
type Schema15SchemaExpected = {
  string?: string;
  number?: number;
};
type Schema15SchemaActual = SchemaToTypescriptType<typeof Schema15>;
expectTypeOf<Schema15SchemaActual>().toEqualTypeOf<Schema15SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema15SchemaActual['notInSchema']>();

type Schema15ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema15>;
expectTypeOf<IsEmptyObject<Schema15ReadonlyActual>>().toEqualTypeOf<true>();

type Schema15WriteonlyExpected = {
  string: string;
  number: number;
};
type Schema15WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema15>;
expectTypeOf<Schema15WriteonlyActual>().toEqualTypeOf<Schema15WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema15WriteonlyActual['notInSchema']>();

//Test case 16: simple, non-nested object with additionalProperties and readonly
const Schema16 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
  },
  { additionalProperties: true, readonly: true }
);
type Schema16SchemaExpected = {
  string?: string;
  number?: number;
  [key: string]: unknown;
};
type Schema16SchemaActual = SchemaToTypescriptType<typeof Schema16>;
expectTypeOf<Schema16SchemaActual>().toEqualTypeOf<Schema16SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema16SchemaActual['notInSchema']>().toBeUnknown();

type Schema16ReadonlyExpected = {
  string: string;
  number: number;
  [key: string]: unknown;
};
type Schema16ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema16>;
expectTypeOf<Schema16ReadonlyActual>().toEqualTypeOf<Schema16ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema16ReadonlyActual['notInSchema']>().toBeUnknown();

type Schema16WriteonlyExpected = {
  [key: string]: unknown;
};
type Schema16WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema16>;
expectTypeOf<Schema16WriteonlyActual>().toEqualTypeOf<Schema16WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema16WriteonlyActual['notInSchema']>().toBeUnknown();

//Test case 17: simple, non-nested object with additionalProperties and writeonly
const Schema17 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
  },
  { additionalProperties: true, writeonly: true }
);
type Schema17SchemaExpected = {
  string?: string;
  number?: number;
  [key: string]: unknown;
};
type Schema17SchemaActual = SchemaToTypescriptType<typeof Schema17>;
expectTypeOf<Schema17SchemaActual>().toEqualTypeOf<Schema17SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema17SchemaActual['notInSchema']>().toBeUnknown();

type Schema17ReadonlyExpected = {
  [key: string]: unknown;
};
type Schema17ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema17>;
expectTypeOf<Schema17ReadonlyActual>().toEqualTypeOf<Schema17ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema17ReadonlyActual['notInSchema']>().toBeUnknown();

type Schema17WriteonlyExpected = {
  string: string;
  number: number;
  [key: string]: unknown;
};
type Schema17WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema17>;
expectTypeOf<Schema17WriteonlyActual>().toEqualTypeOf<Schema17WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
expectTypeOf<Schema17WriteonlyActual['notInSchema']>().toBeUnknown();

//Test case 18: nested object with additionalProperties and readonly
const Schema18 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nested: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { additionalProperties: true, readonly: true }
    ),
  },
  {}
);
type Schema18SchemaExpected = {
  string: string;
  number: number;
  nested?: {
    string: string;
    number: number;
    [key: string]: unknown;
  };
};
type Schema18SchemaActual = SchemaToTypescriptType<typeof Schema18>;
expectTypeOf<Schema18SchemaActual>().toEqualTypeOf<Schema18SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema18SchemaActual['notInSchema']>();
expectTypeOf<Required<Schema18SchemaActual>['nested']['notInSchema']>().toBeUnknown();

type Schema18ReadonlyExpected = {
  string: string;
  number: number;
  nested: {
    string: string;
    number: number;
    [key: string]: unknown;
  };
};
type Schema18ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema18>;
expectTypeOf<Schema18ReadonlyActual>().toEqualTypeOf<Schema18ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema18ReadonlyActual['notInSchema']>();
expectTypeOf<Schema18ReadonlyActual['nested']['notInSchema']>().toBeUnknown();

type Schema18WriteonlyExpected = {
  string: string;
  number: number;
};
type Schema18WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema18>;
expectTypeOf<Schema18WriteonlyActual>().toEqualTypeOf<Schema18WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema18WriteonlyActual['notInSchema']>();

//Test case 19: nested object with additionalProperties and writeonly
const Schema19 = new Schema(
  {
    string: Types.string.any,
    number: Types.number.any,
    nested: new Schema(
      {
        string: Types.string.any,
        number: Types.number.any,
      },
      { additionalProperties: true, writeonly: true }
    ),
  },
  {}
);
type Schema19SchemaExpected = {
  string: string;
  number: number;
  nested?: {
    string: string;
    number: number;
    [key: string]: unknown;
  };
};
type Schema19SchemaActual = SchemaToTypescriptType<typeof Schema19>;
expectTypeOf<Schema19SchemaActual>().toEqualTypeOf<Schema19SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema19SchemaActual['notInSchema']>();
expectTypeOf<Required<Schema19SchemaActual>['nested']['notInSchema']>().toBeUnknown();

type Schema19ReadonlyExpected = {
  string: string;
  number: number;
};
type Schema19ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema19>;
expectTypeOf<Schema19ReadonlyActual>().toEqualTypeOf<Schema19ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema19ReadonlyActual['notInSchema']>();

type Schema19WriteonlyExpected = {
  string: string;
  number: number;
  nested: {
    string: string;
    number: number;
    [key: string]: unknown;
  };
};
type Schema19WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema19>;
expectTypeOf<Schema19WriteonlyActual>().toEqualTypeOf<Schema19WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema19WriteonlyActual['notInSchema']>();
expectTypeOf<Schema19WriteonlyActual['nested']['notInSchema']>().toBeUnknown();

//Test case 20: deeply nested object with additionalProperties and readonly
const Schema20 = new Schema(
  {
    deeply: {
      string: Types.string.any,
      number: Types.number.any,
      nested: {
        object: new Schema(
          {
            string: Types.string.any,
            number: Types.number.any,
          },
          { additionalProperties: true, readonly: true }
        ),
      },
    },
  },
  {}
);
type Schema20SchemaExpected = {
  deeply: {
    string: string;
    number: number;
    nested?: {
      object?: {
        string: string;
        number: number;
        [key: string]: unknown;
      };
    };
  };
};
type Schema20SchemaActual = SchemaToTypescriptType<typeof Schema20>;
expectTypeOf<Schema20SchemaActual>().toEqualTypeOf<Schema20SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema20SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema20SchemaActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Schema20SchemaActual['deeply']>['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema20SchemaActual['deeply']>['nested']>['notInSchema']>();
expectTypeOf<Required<Required<Schema20SchemaActual['deeply']>['nested']>['object']['notInSchema']>().toBeUnknown();

type Schema20ReadonlyExpected = {
  deeply: {
    string: string;
    number: number;
    nested: {
      object: {
        string: string;
        number: number;
        [key: string]: unknown;
      };
    };
  };
};
type Schema20ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema20>;
expectTypeOf<Schema20ReadonlyActual>().toEqualTypeOf<Schema20ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema20ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema20ReadonlyActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema20ReadonlyActual['deeply']['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema20ReadonlyActual['deeply']['nested']['notInSchema']>();
expectTypeOf<Schema20ReadonlyActual['deeply']['nested']['object']['notInSchema']>().toBeUnknown();

type Schema20WriteonlyExpected = {
  deeply: {
    string: string;
    number: number;
  };
};
type Schema20WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema20>;
expectTypeOf<Schema20WriteonlyActual>().toEqualTypeOf<Schema20WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema20WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema20WriteonlyActual['deeply']['notInSchema']>();

//Test case 21: deeply nested object with additionalProperties and writeonly
const Schema21 = new Schema(
  {
    deeply: {
      string: Types.string.any,
      number: Types.number.any,
      nested: {
        object: new Schema(
          {
            string: Types.string.any,
            number: Types.number.any,
          },
          { additionalProperties: true, writeonly: true }
        ),
      },
    },
  },
  {}
);
type Schema21SchemaExpected = {
  deeply: {
    string: string;
    number: number;
    nested?: {
      object?: {
        string: string;
        number: number;
        [key: string]: unknown;
      };
    };
  };
};
type Schema21SchemaActual = SchemaToTypescriptType<typeof Schema21>;
expectTypeOf<Schema21SchemaActual>().toEqualTypeOf<Schema21SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema21SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema21SchemaActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Schema21SchemaActual['deeply']>['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema21SchemaActual['deeply']>['nested']>['notInSchema']>();
expectTypeOf<Required<Required<Schema21SchemaActual['deeply']>['nested']>['object']['notInSchema']>().toBeUnknown();

type Schema21ReadonlyExpected = {
  deeply: {
    string: string;
    number: number;
  };
};
type Schema21ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema21>;
expectTypeOf<Schema21ReadonlyActual>().toEqualTypeOf<Schema21ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema21ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema21ReadonlyActual['deeply']['notInSchema']>();

type Schema21WriteonlyExpected = {
  deeply: {
    string: string;
    number: number;
    nested: {
      object: {
        string: string;
        number: number;
        [key: string]: unknown;
      };
    };
  };
};
type Schema21WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema21>;
expectTypeOf<Schema21WriteonlyActual>().toEqualTypeOf<Schema21WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema21WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema21WriteonlyActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema21WriteonlyActual['deeply']['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema21WriteonlyActual['deeply']['nested']['notInSchema']>();
expectTypeOf<Schema21WriteonlyActual['deeply']['nested']['object']['notInSchema']>().toBeUnknown();

//Test case 22: deeply nested empty object with additionalProperties and writeonly
const Schema22 = new Schema(
  {
    deeply: {
      string: Types.string.any,
      number: Types.number.any,
      nested: {
        object: new Schema({}, { additionalProperties: true, writeonly: true }),
      },
    },
  },
  {}
);
type Schema22SchemaExpected = {
  deeply: {
    string: string;
    number: number;
    nested?: {
      object?: {
        [key: string]: unknown;
      };
    };
  };
};
type Schema22SchemaActual = SchemaToTypescriptType<typeof Schema22>;
expectTypeOf<Schema22SchemaActual>().toEqualTypeOf<Schema22SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema22SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema22SchemaActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Schema22SchemaActual['deeply']>['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema22SchemaActual['deeply']>['nested']>['notInSchema']>();
expectTypeOf<Required<Required<Schema22SchemaActual['deeply']>['nested']>['object']['notInSchema']>().toBeUnknown();

type Schema22ReadonlyExpected = {
  deeply: {
    string: string;
    number: number;
  };
};
type Schema22ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema22>;
expectTypeOf<Schema22ReadonlyActual>().toEqualTypeOf<Schema22ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema22ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema22ReadonlyActual['deeply']['notInSchema']>();

type Schema22WriteonlyExpected = {
  deeply: {
    string: string;
    number: number;
    nested?: {
      object?: {
        [key: string]: unknown;
      };
    };
  };
};
type Schema22WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema22>;
expectTypeOf<Schema22WriteonlyActual>().toEqualTypeOf<Schema22WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema22WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema22WriteonlyActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema22WriteonlyActual['deeply']>['nested']>['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema22WriteonlyActual['deeply']>['nested']>['notInSchema']>();
expectTypeOf<
  Required<Required<Required<Schema22WriteonlyActual['deeply']>['nested']>['object']>['notInSchema']
>().toBeUnknown();

//Test case 23: deeply nested empty object with additionalProperties and readonly
const Schema23 = new Schema(
  {
    deeply: {
      string: Types.string.any,
      number: Types.number.any,
      nested: {
        object: new Schema({}, { additionalProperties: true, readonly: true }),
      },
    },
  },
  {}
);
type Schema23SchemaExpected = {
  deeply: {
    string: string;
    number: number;
    nested?: {
      object?: {
        [key: string]: unknown;
      };
    };
  };
};
type Schema23SchemaActual = SchemaToTypescriptType<typeof Schema23>;
expectTypeOf<Schema23SchemaActual>().toEqualTypeOf<Schema23SchemaExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema23SchemaActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema23SchemaActual['deeply']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Schema23SchemaActual['deeply']>['nested']['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema23SchemaActual['deeply']>['nested']>['notInSchema']>();
expectTypeOf<Required<Required<Schema23SchemaActual['deeply']>['nested']>['object']['notInSchema']>().toBeUnknown();

type Schema23ReadonlyExpected = {
  deeply: {
    string: string;
    number: number;
    nested?: {
      object?: {
        [key: string]: unknown;
      };
    };
  };
};
type Schema23ReadonlyActual = ReadonlySchemaToTypescriptType<typeof Schema23>;
expectTypeOf<Schema23ReadonlyActual>().toEqualTypeOf<Schema23ReadonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema23ReadonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Schema23ReadonlyActual['deeply']>['notInSchema']>();
// @ts-expect-error
expectTypeOf<Required<Required<Schema23ReadonlyActual['deeply']>['nested']>['notInSchema']>();
expectTypeOf<
  Required<Required<Required<Schema23ReadonlyActual['deeply']>['nested']>['object']>['notInSchema']
>().toBeUnknown();

type Schema23WriteonlyExpected = {
  deeply: {
    string: string;
    number: number;
  };
};
type Schema23WriteonlyActual = WriteonlySchemaToTypescriptType<typeof Schema23>;
expectTypeOf<Schema23WriteonlyActual>().toEqualTypeOf<Schema23WriteonlyExpected>();

//toEqualTypeOf does not check for presence of `[key: string]: unknown`
// @ts-expect-error
expectTypeOf<Schema23WriteonlyActual['notInSchema']>();
// @ts-expect-error
expectTypeOf<Schema23WriteonlyActual['deeply']['notInSchema']>();
