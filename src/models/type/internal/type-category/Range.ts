export class Range {
  public constructor(public readonly min: number, public readonly max: number) {}

  public isValid() {
    return this.min <= this.max;
  }

  public isDifferentiableFrom(other: Range) {
    return this.isValid() && other.isValid() && (this.max < other.min || this.min > other.max);
  }
}
