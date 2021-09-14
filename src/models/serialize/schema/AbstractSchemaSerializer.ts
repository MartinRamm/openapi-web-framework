import { AbstractSerializer } from 'src/models/serialize/AbstractSerializer';
import { Schema as SchemaClass, SchemaSpecification } from 'src/models/schema/Schema';
import { SchemaToTypescriptType } from 'src/models/schema/to-typescript/SchemaToTypescriptType';

export abstract class AbstractValueSerializer<
  Spec extends SchemaSpecification,
  Schema extends SchemaClass<Spec, any>
> extends AbstractSerializer<SchemaToTypescriptType<Schema>> {}
