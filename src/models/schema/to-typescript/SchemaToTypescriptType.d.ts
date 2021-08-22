import { ConvertSchema } from 'src/models/schema/to-typescript/internal/ConvertSchema';

/**
 * Convert a Schema to a typescript type. Readonly and writeonly types are marked as optional.
 * @See src/models/schema/Schema;
 */

export type SchemaToTypescriptType<S extends Schema<any, any>> = ConvertSchema<S, 'optional'>; // eslint-disable-line @typescript-eslint/no-explicit-any
