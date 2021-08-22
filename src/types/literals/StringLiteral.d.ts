//from https://github.com/microsoft/TypeScript/issues/42644#issuecomment-774315112

export type StringLiteral<Literal> = Literal extends string ? (string extends Literal ? never : Literal) : never;
