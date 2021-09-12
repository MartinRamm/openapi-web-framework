export type ParseRouteSegmentData = {
  readonly method: string;
  readonly rawPath: string;
  readonly rawBody: string;

  readonly pathSegmentIndex: number;
  readonly pathSegments: string[];

  readonly pathVariables: string[];

  readonly query: Record<string, string>;
  readonly headers: Record<string, string>;
  readonly cookies: Record<string, string>;
};
