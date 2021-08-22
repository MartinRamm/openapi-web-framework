import { AbstractSerializer } from 'src/models/serialize/AbstractSerializer';
import { Schema as SchemaClass, SchemaSpecification } from 'src/models/schema/Schema';
import { SchemaToTypescriptType } from 'src/models/schema/to-typescript/SchemaToTypescriptType';

export abstract class AbstractValueSerializer<
  Spec extends SchemaSpecification,
  Schema extends SchemaClass<Spec, any> //eslint-disable-line @typescript-eslint/no-explicit-any
> extends AbstractSerializer<SchemaToTypescriptType<Schema>> {}
