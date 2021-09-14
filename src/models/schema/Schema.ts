import { GenericType } from 'src/models/type/internal/AbstractType';
import { ObjectMetadata } from 'src/models/type/internal/Metadata';

export type SchemaSpecification = {
  [key: string]: GenericType | SchemaSpecification | Schema<any, any>;
};

export class Schema<Spec extends SchemaSpecification, Metadata extends ObjectMetadata> {
  public readonly schema: Spec;
  public readonly metadata: Metadata;

  constructor(schema: Spec, metadata: Metadata) {
    this.schema = schema;
    this.metadata = metadata;
  }
}
