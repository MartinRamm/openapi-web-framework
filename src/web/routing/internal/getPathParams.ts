import { GetPathParamsType } from 'src/web/routing/internal/GetPathParamsType';
import { regexLastIndexOf } from 'src/util/regexpLastIndexOf';

const leftBracketRegexp = /(?<!\\){/;
const rightBracketRegexp = /(?<!\\)}/;

export const getPathParams = <T extends string>(path: T): Array<GetPathParamsType<T>> =>
  path.search(leftBracketRegexp) < 0 || path.search(rightBracketRegexp) < 0
    ? []
    : path
        // "/animal/{anim\\}alId}/cat/id-{catId}/new"
        .substring(path.search(leftBracketRegexp), regexLastIndexOf(path, rightBracketRegexp))
        // "{anim\\}alId}/cat/id-{catId"
        .split(rightBracketRegexp)
        // ["{anim\\}alId", "/cat/id-{catId"]
        .map(segment => segment.substr(segment.search(leftBracketRegexp) + 1))
        // ["anim\\}alId", "catId"]
        .map(segment => segment.replace(/\\{/g, '{').replace(/\\}/g, '}'));
// ["anim}alId", "catId"]
