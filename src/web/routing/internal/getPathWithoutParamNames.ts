import { getPathParams } from 'src/web/routing/internal/getPathParams';

/**
 * e.g.: getPathWithoutParamNames('/path/{param0}/{param1}/') ==> '/path/{}/{}/'
 */
export const getPathWithoutParamNames = <T extends string>(path: T): string => {
  let newPath: string = path;
  for (let param of getPathParams(path)) {
    param = param.replace(/{/g, '\\{').replace(/}/g, '\\}'); //replaces only the leftmost match
    param = `{${param}}`;

    newPath = newPath.replace(param, '{}');
  }

  return newPath;
};
