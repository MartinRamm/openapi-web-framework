export type ParseRouteSegmentData = {
  method: string;
  pathSegmentIndex: number;
  readonly pathSegments: string[];
  pathVariables: string[];
  readonly queryString: string;
};
