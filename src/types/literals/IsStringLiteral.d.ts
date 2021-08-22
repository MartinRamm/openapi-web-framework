//from https://github.com/microsoft/TypeScript/issues/42644#issuecomment-774315112

import { StringLiteral } from 'src/types/literals/StringLiteral';

export type IsStringLiteral<Literal> = StringLiteral<Literal> extends never ? false : true;
