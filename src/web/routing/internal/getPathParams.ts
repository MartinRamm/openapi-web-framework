import { GetPathParamsType } from 'src/web/routing/internal/GetPathParamsType';
import { regexLastIndexOf } from 'src/util/regexpLastIndexOf';
import { regExpNonEscapedLeftBracket } from 'src/web/routing/internal/regExpNonEscapedLeftBracket';
import { regExpNonEscapedRightBracket } from 'src/web/routing/internal/regExpNonEscapedRightBracket';

/**
 * e.g.: getPathParams('/path/{param0}/{param1}/') ==> ['param0', 'param1']
 */
export const getPathParams = <T extends string>(path: T): Array<GetPathParamsType<T>> =>
  path.search(regExpNonEscapedLeftBracket) < 0 || path.search(regExpNonEscapedRightBracket) < 0
    ? []
    : path
        // "/animal/{anim\\}alId}/cat/id-{catId}/new"
        .substring(path.search(regExpNonEscapedLeftBracket), regexLastIndexOf(path, regExpNonEscapedRightBracket))
        // "{anim\\}alId}/cat/id-{catId"
        .split(regExpNonEscapedRightBracket)
        // ["{anim\\}alId", "/cat/id-{catId"]
        .map(segment => segment.substr(segment.search(regExpNonEscapedLeftBracket) + 1))
        // ["anim\\}alId", "catId"]
        .map(segment => segment.replace(/\\{/g, '{').replace(/\\}/g, '}'));
// ["anim}alId", "catId"]
