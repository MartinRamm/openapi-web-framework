import { Handler } from 'src/web/Handler';
import { GetPathParamsType } from 'src/web/routing/internal/GetPathParamsType';
import { GenericType } from 'src/models/type/internal/AbstractType';
import { getPathParams } from 'src/web/routing/internal/getPathParams';
import { TypeValidationException } from 'src/errors/TypeValidationException';
import { getPathWithoutParamNames } from 'src/web/routing/internal/getPathWithoutParamNames';
import { arrayDeepEquals, arrayDeepEqualsPrimative } from 'src/util/arrayDeepEquals';
import { ioContexts } from 'src/models/serialize/ioContext';

//Replacement for Route<any, any>, which causes the property `pathParamTypes` to be untyped
export type GenericRoute = Route<
  string,
  Record<string, GenericType>,
  Record<string, GenericType>,
  Record<string, GenericType>,
  Record<string, GenericType>,
  boolean
>;

export class Route<
  Path extends string,
  PathParamTypes extends Record<GetPathParamsType<Path>, GenericType>,
  QueryTypes extends Record<string, GenericType>,
  HeaderTypes extends Record<string, GenericType>,
  CookieTypes extends Record<string, GenericType>,
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

  protected matches<T extends Record<string, GenericType>>(types: T, check: Record<string, string>) {
    let validationErrors: Partial<Record<keyof T, TypeValidationException>> = {};
    for (const key of Object.keys(types)) {
      const type = types[key];
      const value = check[key];
      const validateResult = type.validateValue(value);
      if (validateResult.isLeft()) {
        validationErrors = {
          ...validationErrors,
          [key]: validateResult.value,
        };
      }
    }
    return validationErrors;
  }

  public isDifferentiableFrom(otherRoute: GenericRoute): boolean {
    const compareValues = (a: Record<string, GenericType>, b: Record<string, GenericType>) =>
      arrayDeepEquals(
        Object.values(a),
        Object.values(b),
        (a: GenericType, b: GenericType) => a.isDifferentiableFrom(b, ioContexts.path)
      );
    const compareWithKeys = (a: Record<string, GenericType>, b: Record<string, GenericType>) =>
      arrayDeepEqualsPrimative(Object.keys(a), Object.keys(b)) && compareValues(a, b);

    return (
      this.method !== otherRoute.method ||
      this.pathWithoutParamNames !== otherRoute.pathWithoutParamNames ||
      this.requiresBody !== otherRoute.requiresBody ||
      !compareValues(this.pathParamTypes, otherRoute.pathParamTypes) ||
      !compareWithKeys(this.queryTypes, otherRoute.queryTypes) ||
      !compareWithKeys(this.headerTypes, otherRoute.headerTypes) ||
      !compareWithKeys(this.cookieTypes, otherRoute.cookieTypes)
    );
  }
}
