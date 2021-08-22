//from https://github.com/microsoft/TypeScript/issues/42644#issuecomment-774315112

import { NumericLiteral } from 'src/types/literals/NumericLiteral';

export type IsNumericLiteral<Literal> = NumericLiteral<Literal> extends never ? false : true;
