import { expectTypeOf } from 'expect-type';
import { Either } from 'src/fp/Either';

const left = 'left';
const right = 123;

expectTypeOf(left).not.toEqualTypeOf(right);

const createEither = (value: typeof left | typeof right): Either<typeof left, typeof right> =>
  value === left ? Either.Left(left) : Either.Right(right);

//Test case 0: invalid combinations of onLeft/onError, onRight/onSuccess for map
// @ts-expect-error
createEither(left).map({
  onLeft: value => {
    expectTypeOf(value).toEqualTypeOf<typeof left>();
    return value;
  },
  onSuccess: value => {
    expectTypeOf(value).toEqualTypeOf<typeof right>();
    return JSON.stringify(value);
  },
});
// @ts-expect-error
createEither(left).map({
  onError: value => {
    expectTypeOf(value).toEqualTypeOf<typeof left>();
    return value;
  },
  onRight: value => {
    expectTypeOf(value).toEqualTypeOf<typeof right>();
    return JSON.stringify(value);
  },
});

//Test case 1: invalid combinations of onLeft/onError, onRight/onSuccess for handle
// @ts-expect-error
createEither(left).handle({
  onLeft: () => {},
  onSuccess: () => {},
});
// @ts-expect-error
createEither(left).handle({
  onError: () => {},
  onRight: () => {},
});

//Test case 2: correct type inferring of parameters, correct return type when using `map`
expectTypeOf(
  createEither(left).map({
    onLeft: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
      return value;
    },
    onRight: value => {
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      return JSON.stringify(value);
    },
  })
).toBeString();
expectTypeOf(
  createEither(right).map({
    onLeft: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
      return value;
    },
    onRight: value => {
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      return JSON.stringify(value);
    },
  })
).toBeString();

expectTypeOf(
  createEither(left).map({
    onError: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
      return value;
    },
    onSuccess: value => {
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      return JSON.stringify(value);
    },
  })
).toBeString();
expectTypeOf(
  createEither(right).map({
    onError: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
      return value;
    },
    onSuccess: value => {
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      return JSON.stringify(value);
    },
  })
).toBeString();

//Test case 3: correct type inferring of parameters, correct return type when using `handle`
expectTypeOf(
  createEither(left).handle({
    onLeft: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
    },
    onRight: value => {
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
    },
  })
).toBeVoid();
expectTypeOf(
  createEither(right).handle({
    onLeft: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
    },
    onRight: value => {
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
    },
  })
).toBeVoid();

expectTypeOf(
  createEither(left).handle({
    onError: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
    },
    onSuccess: value => {
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
    },
  })
).toBeVoid();
expectTypeOf(
  createEither(right).handle({
    onError: value => {
      expectTypeOf(value).toEqualTypeOf<typeof left>();
      expectTypeOf(value).not.toEqualTypeOf<typeof right>();
    },
    onSuccess: value => {
      expectTypeOf(value).toEqualTypeOf<typeof right>();
      expectTypeOf(value).not.toEqualTypeOf<typeof left>();
    },
  })
).toBeVoid();

const either = createEither(left);
if (either.isLeft()) {
  expectTypeOf(either.value).toEqualTypeOf<typeof left>();
  expectTypeOf(either.value).not.toEqualTypeOf<typeof right>();
}
if (either.isRight()) {
  expectTypeOf(either.value).toEqualTypeOf<typeof right>();
  expectTypeOf(either.value).not.toEqualTypeOf<typeof left>();
}
