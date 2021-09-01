import { Request } from './Request';
import { Response } from './Response';

export type Handler = (request: Request) => Response;
