export type GetPathParams<T extends string> =
  T extends `${infer Left}{${infer ParamName}}${infer Right}`
    ? ParamName | GetPathParams<Left> | GetPathParams<Right>
    : never;
