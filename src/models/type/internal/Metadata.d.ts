import { AbstractType, GenericType } from 'src/models/type/internal/AbstractType';
import { NonEmptyArray } from 'src/types/NonEmptyArray';

type ReadOnly = { readonly: true };
type WriteOnly = { writeonly: true };
type Nullable = { nullable: true };

//all possibilities need to be explicitly typed here, so we can infer them in SchemaToTypescriptType
export type Metadata =
  | Record<never, never>
  | ReadOnly
  | WriteOnly
  | Nullable
  | (ReadOnly & Nullable)
  | (WriteOnly & Nullable);

type Iterate1<A> =
  | Metadata
  | A
  | (ReadOnly & A)
  | (WriteOnly & A)
  | (Nullable & A)
  | (ReadOnly & Nullable & A)
  | (WriteOnly & Nullable & A);

type Iterate2<A, B> = Iterate1<A> | Iterate1<B> | Iterate1<A & B>;

type Iterate3<A, B, C> = Iterate2<A, B> | Iterate2<A, C> | Iterate2<B, C> | Iterate1<A & B & C>;

type Iterate4<A, B, C, D> =
  | Iterate3<A, B, C>
  | Iterate3<A, B, D>
  | Iterate3<A, C, D>
  | Iterate3<B, C, D>
  | Iterate1<A & B & C & D>;

type Iterate5<A, B, C, D, E> =
  | Iterate4<A, B, C, D>
  | Iterate4<A, B, C, E>
  | Iterate4<A, B, D, E>
  | Iterate4<A, C, D, E>
  | Iterate4<B, C, D, E>
  | Iterate1<A & B & C & D & E>;

export type StringEnumMetadata = { enumList: NonEmptyArray<string> } & Metadata;

export type StringLengthMetadata = Iterate2<{ minLength: number }, { maxLength: number }>;

export type StringPatternMetadata = {
  pattern: RegExp;
  examples: NonEmptyArray<string>;
} & Iterate2<{ minLength: number }, { maxLength: number }>;

export type StringMetadata = StringEnumMetadata | StringLengthMetadata | StringPatternMetadata;

export type NumberMetadata = Iterate5<
  { minimum: number },
  { maximum: number },
  { exclusiveMinimum: true },
  { exclusiveMaximum: true },
  { multipleOf: number }
>;

export type ArrayMetadata = {
  itemsType: GenericType;
} & Iterate3<{ minItems: number }, { maxItems: number }, { uniqueItems: true }>;

type UntypedObjectMetadata = { additionalProperties: true } & Iterate2<
  { minProperties: number },
  { maxProperties: number }
>;
export type ObjectMetadata =
  | Iterate2<{ spec: Record<string, GenericType> }, { additionalProperties: true }>
  | UntypedObjectMetadata;

export type OneOfMetadata = { oneOf: NonEmptyArray<AbstractType<unknown, unknown>> } & Metadata;

export type NotOneOfMetadata = { notOneOf: NonEmptyArray<AbstractType<unknown, unknown>> } & Metadata;
