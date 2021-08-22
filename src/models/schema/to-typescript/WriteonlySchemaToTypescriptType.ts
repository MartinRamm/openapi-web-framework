import { ConvertSchema } from 'src/models/schema/to-typescript/internal/ConvertSchema';
import { Schema } from 'src/models/schema/Schema';

/**
 * Convert a Schema to a typescript type. Writeonly types are excluded, readonly types are included.
 * @See src/models/schema/Schema;
 */
export type WriteonlySchemaToTypescriptType<S extends Schema<any, any>> = ConvertSchema<S, 'readonly'>; // eslint-disable-line @typescript-eslint/no-explicit-any
