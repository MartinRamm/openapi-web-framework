import { ConvertSchema } from 'src/models/schema/to-typescript/internal/ConvertSchema';
import { Schema } from 'src/models/schema/Schema';

/**
 * Convert a Schema to a typescript type. Readonly types are included, writeonly types are excluded.
 * @See src/models/schema/Schema;
 */
export type ReadonlySchemaToTypescriptType<S extends Schema<any, any>> = ConvertSchema<S, 'writeonly'>; // eslint-disable-line @typescript-eslint/no-explicit-any
