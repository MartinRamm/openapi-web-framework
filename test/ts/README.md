The typescript typing system is tested here, using
[expect-type](https://github.com/mmkal/ts/tree/main/packages/expect-type#readme). This includes both positive test cases
(that are supposed to compile without errors) and negative test cases (that are supposed to cause compile errors,
marked with `// @ts-expect-error`).

The code in this folder is never run in the node context (e.g. to catch runtime errors), but only run against the
typescript compiler. If you want to write unit tests, do it [in this folder](../unit/README.md).

There are two types of tests here:
1. `.ts` files that are simply compiled to check for errors.
1. `.js` files that generate typescript code (via console output) that is then compiled to check for errors.

There is a custom typescript config file (`tsconfig-test.json`) for this in the repository root.

Relevant `npm run` commands:
* `_test-ts`
* `_test-ts-build`
* `_test-ts-exec`
