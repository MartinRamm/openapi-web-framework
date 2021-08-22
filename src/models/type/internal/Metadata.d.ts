import { AbstractType } from 'src/models/type/internal/AbstractType';
import { Schema } from 'src/models/schema/Schema';

//all possibilities need to be explicitly typed here, so we can infer them in SchemaToTypescriptType
export type Metadata = Record<never, never> | { readonly: true } | { writeonly: true };
export type TypedObjectMetadata =
  | Metadata
  | { additionalProperties: true }
  | { additionalProperties: true; readonly: true }
  | { additionalProperties: true; writeonly: true }
  | { additionalProperties: true; additionalPropertiesType: AbstractType<unknown, unknown> | Schema<unknown, unknown> }
  | {
      additionalProperties: true;
      additionalPropertiesType: AbstractType<unknown, unknown> | Schema<unknown, unknown>;
      readonly: true;
    } //TODO implement
  | {
      additionalProperties: true;
      additionalPropertiesType: AbstractType<unknown, unknown> | Schema<unknown, unknown>;
      writeonly: true;
    };

export interface StringMetadata extends Metadata {
  minLength?: number;
  maxLength?: number;
}

export interface StringPatternMetadata extends StringMetadata {
  pattern: RegExp;
}

export interface NumberMetadata extends Metadata {
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: true;
  exclusiveMaximum?: true;
  multipleOf?: number;
}

export interface ArrayMetadata extends Metadata {
  minItems?: number;
  maxItems?: number;
  uniqueItems?: true; //if true, use sets?
}

export interface UntypedObject extends Metadata {
  minProperties?: number;
  maxProperties?: number;
}
