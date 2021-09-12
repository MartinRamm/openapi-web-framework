import { NumberMetadata } from 'src/models/type/internal/Metadata';
import { Range } from 'src/models/type/internal/typeCategory/Range';

export class NumberRange extends Range{
  constructor(metadata: NumberMetadata) {
    let min = -Infinity;
    if ('minimum' in metadata) {
      min = metadata.minimum || min;
    }
    if ('exclusiveMinimum' in metadata && metadata.exclusiveMinimum) {
      min += 0.000000000000000001;
    }

    let max = Infinity;
    if ('maximum' in metadata) {
      max = metadata.maximum || max;
    }
    if ('exclusiveMaximum' in metadata && metadata.exclusiveMaximum) {
      max -= 0.000000000000000001;
    }

    super(min, max);
  }
}
