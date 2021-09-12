import { Handler } from 'src/web/Handler';
import { GetPathParamsType } from 'src/web/routing/internal/GetPathParamsType';
import { AbstractType } from 'src/models/type/internal/AbstractType';
import { getPathParams } from 'src/web/routing/internal/getPathParams';
import { TypeValidationException } from 'src/errors/TypeValidationException';
import { getPathWithoutParamNames } from 'src/web/routing/internal/getPathWithoutParamNames';
import { arrayDeepEquals, arrayDeepEqualsPrimative } from 'src/util/arrayDeepEquals';

//Replacement for Route<any, any>, which causes the property `pathParamTypes` to be untyped
export type GenericRoute = Route<
  string,
  Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  boolean
>;

export class Route<
  Path extends string,
  PathParamTypes extends Record<GetPathParamsType<Path>, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  QueryTypes extends Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  HeaderTypes extends Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  CookieTypes extends Record<string, AbstractType<any, any>>, //eslint-disable-line @typescript-eslint/no-explicit-any
  RequiresBody extends boolean
> {
  public readonly pathParams: Array<GetPathParamsType<Path>>;
  public readonly pathWithoutParamNames: string;

  constructor(
    public readonly method: string,
    public readonly path: Path,
    public readonly pathParamTypes: PathParamTypes,
    public readonly queryTypes: QueryTypes,
    public readonly headerTypes: HeaderTypes,
    public readonly cookieTypes: CookieTypes,
    public readonly requiresBody: RequiresBody,
    public readonly handler: Handler
  ) {
    this.pathParams = getPathParams(path);
    this.pathWithoutParamNames = this.pathParams.length === 0 ? path : getPathWithoutParamNames(path);
  }

  public pathParamMatchErrors(pathParam: Record<string, string>) {
    return this.matches(this.pathParamTypes, pathParam);
  }

  public queryMatchErrors(query: Record<string, string>) {
    return this.matches(this.queryTypes, query);
  }

  public headersMatchErrors(header: Record<string, string>) {
    return this.matches(this.headerTypes, header);
  }

  public cookiesMatchErrors(cookie: Record<string, string>) {
    return this.matches(this.cookieTypes, cookie);
  }

  protected matches<T extends Record<string, AbstractType<any, any>>>(types: T, check: Record<string, string>) {
    let validationErrors: Partial<Record<keyof T, TypeValidationException>> = {};
    for (const key of Object.keys(types)) {
      const type = types[key];
      const value = check[key];
      const validateResult = type.validateValue(value);
      if (validateResult.isLeft()) {
        validationErrors = {
          ...validationErrors,
          [key]: validateResult.value
        };
      }
    }
    return validationErrors;
  }

  public isDifferentiableFrom(otherRoute: GenericRoute): boolean {
    const compare = (a: Record<string, AbstractType<any, any>>, b: Record<string, AbstractType<any, any>>) =>
      arrayDeepEqualsPrimative(Object.keys(a), Object.keys(b))
        && arrayDeepEquals(
          Object.values(a),
          Object.values(b),
          (a: AbstractType<any, any>, b: AbstractType<any, any>) => a === b ? false : a.isDifferentiableFrom(b)
      );

    return this.method !== otherRoute.method
      || this.pathWithoutParamNames !== otherRoute.pathWithoutParamNames
      || this.requiresBody !== otherRoute.requiresBody
      || !compare(this.pathParamTypes, otherRoute.pathParamTypes)
      || !compare(this.queryTypes, otherRoute.queryTypes)
      || !compare(this.headerTypes, otherRoute.headerTypes)
      || !compare(this.cookieTypes, otherRoute.cookieTypes);
  }
}
