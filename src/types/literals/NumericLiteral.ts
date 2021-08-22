//from https://github.com/microsoft/TypeScript/issues/42644#issuecomment-774315112

export type NumericLiteral<Literal> = Literal extends number ? (number extends Literal ? never : Literal) : never;
