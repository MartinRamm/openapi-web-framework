import { ArrayMetadata } from 'src/models/type/internal/Metadata';
import { Range } from 'src/models/type/internal/type-category/Range';

export class ArrayRange extends Range {
  constructor(metadata: ArrayMetadata) {
    let min = -Infinity;
    if ('minItems' in metadata) {
      min = metadata.minItems || min;
    }

    let max = Infinity;
    if ('maxItems' in metadata) {
      max = metadata.maxItems || max;
    }

    super(min, max);
  }
}
