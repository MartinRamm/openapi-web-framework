const recursive = (searchString: string, regexp: RegExp, lastResult: number): number => {
  const result = searchString.search(regexp);
  if (result < 0) {
    return lastResult;
  }

  const newSearchString = searchString.substr(result + 1);
  const newLastResult = lastResult + result + 1;
  return recursive(newSearchString, regexp, newLastResult);
};

export const regexLastIndexOf = (searchString: string, regexp: RegExp) => recursive(searchString, regexp, -1);
