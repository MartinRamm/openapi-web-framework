import { GenericRoute } from '../../web/routing/Route';
import { TypeValidationException } from 'src/errors/TypeValidationException';

export type UnmatchedParamTypes = Array<{ route: GenericRoute; paramErrors: Record<string, TypeValidationException> }>;

const description = {
  path: ' variable',
  query: ' string',
  headers: '',
  cookies: '',
  body: '',
}

export class InvalidParamException extends Error {
  constructor(
    public readonly type: 'body' | 'path' | 'query' | 'headers' | 'cookies',
    public readonly path: string,
    public readonly variableValue: string | Record<string, string>,
    public readonly unmatchedParamTypes: UnmatchedParamTypes
  ) {
    super(`Bad Request: "${path}" contains invalid ${type}${description[type]}${typeof variableValue === 'string' ? ': "' + variableValue + '"' : ''}`);
  }
}
