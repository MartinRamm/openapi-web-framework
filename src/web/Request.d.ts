import { SecureContextOptions } from 'tls';

export interface Request {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  method: string;
  path: string;
  pathVariables: Record<string, string>;
  queryString: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  https?: SecureContextOptions;
}
