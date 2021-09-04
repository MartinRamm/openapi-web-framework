export type GetPathParamsType<T extends string> = T extends `\\{${infer Right}`
  ? GetPathParamsType<Right>
  : T extends `\\}${infer Right}`
  ? GetPathParamsType<Right>
  : T extends `${infer Left}\\{`
  ? GetPathParamsType<Left>
  : T extends `${infer Left}\\}`
  ? GetPathParamsType<Left>
  : T extends `${infer Left}\\{${infer CenterL}{${infer Param}}${infer CenterR}\\}${infer Right}` // 'Left\\{CenterL{Param}CenterR\\}Right'
  ? GetPathParamsType<Left> | GetPathParamsType<CenterL> | Param | GetPathParamsType<CenterR> | GetPathParamsType<Right>
  : T extends `${infer Left}{${infer ParamA}\\{${infer ParamB}\\}${infer ParamC}}${infer Right}` // 'Left{ParamA\\{ParamB\\}ParamC}Right'
  ?
      | (ParamA extends `${infer ParamAL}}${infer ParamAR}`
          ? GetPathParamsType<`{${ParamAL}}`> | GetPathParamsType<`${ParamAR}\\{${ParamB}\\}${ParamC}}`>
          : `${ParamA}{${ParamB}}${ParamC}`)
      | GetPathParamsType<Left>
      | GetPathParamsType<Right>
  : T extends `${infer Left}\\{${infer Center}\\}${infer Right}` // 'Left\\{Center\\}Right'
  ? GetPathParamsType<Left> | GetPathParamsType<Center> | GetPathParamsType<Right>
  : T extends `${infer Left}{${infer ParamL}\\}${infer ParamR}}${infer Right}` // 'Left{ParamL\\}ParamR}Right'
  ?
      | (ParamL extends `${infer ParamLL}}${infer ParamLR}`
          ? GetPathParamsType<`{${ParamLL}}`> | GetPathParamsType<`${ParamLR}\\}${ParamR}}`>
          : `${ParamL}}${ParamR}`)
      | GetPathParamsType<Left>
      | GetPathParamsType<Right>
  : T extends `${infer Left}{${infer ParamL}\\{${infer ParamR}}${infer Right}` // 'Left{ParamL\\{ParamR}Right'
  ?
      | (ParamL extends `${infer ParamLL}}${infer ParamLR}`
          ? GetPathParamsType<`{${ParamLL}}`> | GetPathParamsType<`${ParamLR}\\{${ParamR}}`>
          : `${ParamL}{${ParamR}`)
      | GetPathParamsType<Left>
      | GetPathParamsType<Right>
  : T extends `${infer Left}\\{${infer Right}` // 'Left\\{Right'
  ? GetPathParamsType<Left> | GetPathParamsType<Right>
  : T extends `${infer Left}\\}${infer Right}` // 'Left\\}Right'
  ? GetPathParamsType<Left> | GetPathParamsType<Right>
  : T extends `${infer Left}{${infer Param}}${infer Right}` // 'Left{Param}Right'
  ? Param | GetPathParamsType<Left> | GetPathParamsType<Right>
  : never;
