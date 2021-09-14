import { ObjectMetadata } from 'src/models/type/internal/Metadata';
import { Range } from 'src/models/type/internal/type-category/Range';

export class ObjectRange extends Range {
  constructor(metadata: ObjectMetadata) {
    let min = -Infinity;
    if ('minProperties' in metadata) {
      min = metadata.minProperties || min;
    }

    let max = Infinity;
    if ('maxProperties' in metadata) {
      max = metadata.maxProperties || max;
    }

    super(min, max);
  }
}
