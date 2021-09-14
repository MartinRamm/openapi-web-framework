type OptionsLeftRight<Left, Right, Return> = { onLeft: (value: Left) => Return; onRight: (value: Right) => Return };
type OptionsErrorSuccess<Left, Right, Return> = {
  onError: (value: Left) => Return;
  onSuccess: (value: Right) => Return;
};
const isOptionsLeftRight = <Left, Right, Return>(
  options: OptionsLeftRight<Left, Right, Return> | OptionsErrorSuccess<Left, Right, Return>
): options is OptionsLeftRight<Left, Right, Return> => 'onLeft' in options;

/**
 * A limited implementation of `Either`, a simple way to implement typed errors in TS.
 * There are two states this object can have: Left (indicating an error) or Right (indicating success).
 * This is used instead of throwing errors, because errors can't be typed in TS.
 */
export abstract class Either<Left, Right> {
  protected constructor(protected readonly type: 'L' | 'R', public readonly value: Left | Right) {}

  public static Left<Left, Right>(value: Left): Either<Left, Right> {
    return new EitherLeft(value);
  }

  public static Right<Left, Right>(value: Right): Either<Left, Right> {
    return new EitherRight(value);
  }

  public abstract isLeft(): this is Either<Left, Left>;

  public isRight(): this is Either<Right, Right> {
    return !this.isLeft();
  }

  /**
   * Use this function to map this object to the `Either` implementation of your choosing.
   */
  public map<T>(options: OptionsLeftRight<Left, Right, T> | OptionsErrorSuccess<Left, Right, T>): T {
    const unifiedOptions: OptionsLeftRight<Left, Right, T> = isOptionsLeftRight(options)
      ? options
      : { onLeft: options.onError, onRight: options.onSuccess };

    if (this.isLeft()) {
      return unifiedOptions.onLeft(this.value);
    } else if (this.isRight()) {
      return unifiedOptions.onRight(this.value);
    }
    //this is an impossible to reach statement
    //eslint-disable-next-line ts-immutable/no-throw
    throw new Error('Either must be left or right');
  }

  /**
   * Use this function to simply handle the success / error cases.
   */
  public handle(options: OptionsLeftRight<Left, Right, void> | OptionsErrorSuccess<Left, Right, void>): void {
    this.map(options);
  }
}

class EitherLeft<Left, Right> extends Either<Left, Right> {
  public constructor(value: Left) {
    super('L', value);
  }

  /**
   * @inheritDoc
   * @override
   */
  public isLeft(): this is Either<Left, Left> {
    return true;
  }
}

class EitherRight<Left, Right> extends Either<Left, Right> {
  public constructor(value: Right) {
    super('R', value);
  }

  /**
   * @inheritDoc
   * @override
   */
  public isLeft(): this is Either<Left, Left> {
    return false;
  }
}
