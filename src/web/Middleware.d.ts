import { Request } from './Request';
import { Response } from 'src/web/Response';

export type MiddlewareBefore = (request: Request, store: Record<string, any>) => Record<string, any>; //TODO
export type MiddlewareAfter = (request: Request, store: Record<string, any>, response: Response) => Response; //TODO
