/*export type OwfInitOptions = {
  port?: number;
  routes: {};
};

const x = '/:first/asdf/:named/:multiple/not/behind/:each';
type PathParam<T extends string> =
  T extends `/:${infer Param}/${infer ParseNext}` //param at beginning of the path (with more to path)
  ? Param | PathParam<`/${ParseNext}`>
  : T extends `${string}/:${infer Param}/${infer ParseNext}` //param in middle of path (with more to path)
  ? Param | PathParam<`/${ParseNext}`>
  : T extends `${string}/:${infer Param}/` //param at end of path (following a `/`)
  ? Param
  : T extends `${string}/:${infer Param}` //param at end of path (not following a `/`)
  ? Param
  : never;
/*
type RouteOptions< extends `/${string}`> = {
  pathParams: Record<PathParam<>, number>;
  middlewares?: {};
  get?: {};
  post?: {};
  put?: {};
  delete?: {};
  patch?: {};
  head?: {};
  options?: {};
};

const fn = <A extends `/${string}`>(options: { [key in A]: Record<PathParam<key>, number> }) => true;

fn({
  '/:zzzz': { zzzz: 5 },
  '/:asdf': { asdf: 2 },
});

type O1 = {
  [key: string]: typeof key extends infer T ? T : never;
}

const o1 = {
  'a': 'a',
  'b': 'b',
  'c': 'b',
}*/
