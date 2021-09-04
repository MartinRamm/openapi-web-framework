const recursive = (search: string, regexp: RegExp, lastResult: number): number => {
  const result = search.search(regexp);
  if (result < 0) {
    return lastResult;
  }

  search = search.substr(result + 1);
  if (lastResult < 0) {
    return recursive(search, regexp, result);
  }
  return recursive(search, regexp, lastResult + result + 1);
};

export const regexLastIndexOf = (search: string, regexp: RegExp) => recursive(search, regexp, -1);
