type ExtractPathParams<T extends string> = T extends `\\{${infer Right}`
  ? ExtractPathParams<Right>
  : T extends `\\}${infer Right}`
  ? ExtractPathParams<Right>
  : T extends `${infer Left}\\{`
  ? ExtractPathParams<Left>
  : T extends `${infer Left}\\}`
  ? ExtractPathParams<Left>
  : T extends `${infer Left}\\{${infer CenterL}{${infer Param}}${infer CenterR}\\}${infer Right}` // 'Left\\{CenterL{Param}CenterR\\}Right'
  ? ExtractPathParams<Left> | ExtractPathParams<CenterL> | Param | ExtractPathParams<CenterR> | ExtractPathParams<Right>
  : T extends `${infer Left}{${infer ParamA}\\{${infer ParamB}\\}${infer ParamC}}${infer Right}` // 'Left{ParamA\\{ParamB\\}ParamC}Right'
  ? `${ParamA}{${ParamB}}${ParamC}` | ExtractPathParams<Left> | ExtractPathParams<Right>
  : T extends `${infer Left}\\{${infer Center}\\}${infer Right}` // 'Left\\{Center\\}Right'
  ? ExtractPathParams<Left> | ExtractPathParams<Center> | ExtractPathParams<Right>
  : T extends `${infer Left}{${infer ParamL}\\}${infer ParamR}}${infer Right}` // 'Left{ParamL\\}ParamR}Right'
  ? `${ParamL}}${ParamR}` | ExtractPathParams<Left> | ExtractPathParams<Right>
  : T extends `${infer Left}{${infer ParamL}\\{${infer ParamR}}${infer Right}` // 'Left{ParamL\\{ParamR}Right'
  ? `${ParamL}{${ParamR}` | ExtractPathParams<Left> | ExtractPathParams<Right>
  : T extends `${infer Left}\\{${infer Right}` // 'Left\\{Right'
  ? ExtractPathParams<Left> | ExtractPathParams<Right>
  : T extends `${infer Left}\\}${infer Right}` // 'Left\\}Right'
  ? ExtractPathParams<Left> | ExtractPathParams<Right>
  : T extends `${infer Left}{${infer Param}}${infer Right}` // 'Left{Param}Right'
  ? Param | ExtractPathParams<Left> | ExtractPathParams<Right>
  : never;

export type GetPathParamsType<T extends string> =
  //analyze path segment by path segment
  T extends `${infer Left}/${infer Right}` ? GetPathParamsType<Left> | GetPathParamsType<Right> : ExtractPathParams<T>;
