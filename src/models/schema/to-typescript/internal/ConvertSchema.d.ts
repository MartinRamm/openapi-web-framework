import { Schema, SchemaSpecification } from 'src/models/schema/Schema';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { Evaluate } from 'src/types/Evaluate';
import { AreAllPropertiesOptional } from 'src/types/AreAllPropertiesOptional';
import { IsEmptyObject } from 'src/types/IsEmptyObject';
import { Metadata as MetadataInterface, ObjectMetadata } from 'src/models/type/internal/Metadata';

type AllowAdditionalProperties = { [key: string]: unknown };

type MetadataKeyOptions = 'readonly' | 'writeonly' | 'optional';

type IsMetadataOfReadonlyOrWriteonlyType<Metadata extends MetadataInterface> = 'readonly' extends keyof Metadata //if this property is present, it is always true
  ? true
  : 'writeonly' extends keyof Metadata //if this property is present, it is always true
  ? true
  : false;

type HasAdditionalProperties<T extends ObjectMetadata> = 'additionalProperties' extends keyof T //if this property is present, it is always true
  ? true
  : false;

type ConvertSpecValue<SpecValue, MetadataKey extends MetadataKeyOptions> = SpecValue extends Schema<any, any> //if value is a nested schema
  ? ConvertNestedSchema<SpecValue, MetadataKey> //convert schema
  : SpecValue extends AbstractType<infer SpecTsType, any> //else if value is a type
  ? SpecTsType //use ts type
  : SpecValue extends AllowAdditionalProperties //else if nested object
  ? SpecToType<SpecValue, MetadataKey> //handle nested object recursively
  : never; //else fail

type MetadataReadWriteDecisionHelper<
  Metadata,
  MetadataKey extends MetadataKeyOptions,
  R1,
  R2,
  R3
> = MetadataKey extends 'optional' //if MetadataKey is optional
  ? IsMetadataOfReadonlyOrWriteonlyType<Metadata> extends true //and if readonly or writeonly is set to true
    ? R1
    : R2
  : MetadataKey extends keyof Metadata //filter if MetadataKey is set to true in Metadata
  ? R3
  : R2;

type RequiredPropertiesOfSpecToType<Spec extends SchemaSpecification, MetadataKey extends MetadataKeyOptions> = {
  [key in keyof Spec as AreAllPropertiesOptional<ConvertSpecValue<Spec[key], MetadataKey>> extends true //this includes empty objects
    ? never
    : Spec[key] extends Schema<any, infer Metadata>
    ? MetadataReadWriteDecisionHelper<Metadata, MetadataKey, never, key, never>
    : Spec[key] extends AbstractType<any, infer Metadata>
    ? MetadataReadWriteDecisionHelper<Metadata, MetadataKey, never, key, never>
    : key]: ConvertSpecValue<Spec[key], MetadataKey>;
};

type OptionalPropertiesOfSpecToType<Spec extends SchemaSpecification, MetadataKey extends MetadataKeyOptions> = Partial<
  {
    [key in keyof Spec as IsEmptyObject<ConvertSpecValue<Spec[key], MetadataKey>> extends true //this includes empty objects
      ? never
      : AreAllPropertiesOptional<ConvertSpecValue<Spec[key], MetadataKey>> extends true //this includes empty objects
      ? key //handled by RequiredPropertiesOfSpecToType
      : Spec[key] extends Schema<any, infer Metadata>
      ? MetadataReadWriteDecisionHelper<Metadata, MetadataKey, key, never, never>
      : Spec[key] extends AbstractType<any, infer Metadata>
      ? MetadataReadWriteDecisionHelper<Metadata, MetadataKey, key, never, never>
      : key]: ConvertSpecValue<Spec[key], MetadataKey>;
  }
>;

type SpecToType<SpecValue extends SchemaSpecification, MetadataKey extends MetadataKeyOptions> = Evaluate<
  RequiredPropertiesOfSpecToType<SpecValue, MetadataKey> & OptionalPropertiesOfSpecToType<SpecValue, MetadataKey>
>;

type ConvertNestedSchema<S extends Schema<any, any>, MetadataKey extends MetadataKeyOptions> = S extends Schema<
  infer Spec,
  infer Metadata
>
  ? HasAdditionalProperties<Metadata> extends true
    ? MetadataKey extends keyof Metadata
      ? Record<string, never> //RequiredPropertiesOfSpecToType will filter this out
      : Evaluate<AllowAdditionalProperties & SpecToType<Spec, MetadataKey>>
    : Evaluate<SpecToType<Spec, MetadataKey>>
  : never;

export type ConvertSchema<S extends Schema<any, any>, MetadataKey extends MetadataKeyOptions> = S extends Schema<
  any,
  infer Metadata
>
  ? MetadataReadWriteDecisionHelper<
      Metadata,
      MetadataKey,
      Partial<ConvertNestedSchema<S, MetadataKey>>,
      ConvertNestedSchema<S, MetadataKey>,
      HasAdditionalProperties<Metadata> extends true ? AllowAdditionalProperties : Record<string, never>
    >
  : never;
