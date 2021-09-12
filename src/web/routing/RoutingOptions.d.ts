export interface RoutingOptions {
  /**
   * Ignore letter cases while matching routes. E.g.: If true, matches `/cat/new/` against `/Cat/new`;
   * @default true
   */
  ignoreCase: boolean;
  /**
   * Ignore multiple (unnecessary) slashes in the path. E.g.: If true, matches `/cat/new` against `/cat//new`.
   * @default true
   */
  ignoreMultipleSlashes: boolean;
  /**
   * Ignore trailing slashes in the path. E.g.: If true, matches `/cat/new` against `/cat/new/`.
   * @default true
   */
  ignoreTrailingSlash: boolean;
}
