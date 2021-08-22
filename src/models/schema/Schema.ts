import { AbstractType } from 'src/models/type/internal/AbstractType';
import { TypedObjectMetadata } from 'src/models/type/internal/Metadata';

export type SchemaSpecification = {
  [key: string]: AbstractType<any, any> | SchemaSpecification | Schema<any, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export class Schema<Spec extends SchemaSpecification, Metadata extends TypedObjectMetadata> {
  public readonly schema: Spec;
  public readonly metadata: Metadata;

  constructor(schema: Spec, metadata: Metadata) {
    this.schema = schema;
    this.metadata = metadata;
  }
}
