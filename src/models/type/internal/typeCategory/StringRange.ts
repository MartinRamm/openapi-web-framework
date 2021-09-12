import { StringMetadata } from 'src/models/type/internal/Metadata';
import { Range } from 'src/models/type/internal/typeCategory/Range';

export class StringRange extends Range {
  constructor(metadata: StringMetadata) {
    let min = -Infinity;
    if ('enumList' in metadata) {
      min = metadata.enumList.reduce<number | undefined>(
        (rawPrevious, current) => {
          const previous = rawPrevious || Infinity;
          return Math.min(previous, current.length)
        },
        undefined
      ) || min;
    } else if ('minLength' in metadata) {
      min = metadata.minLength || min;
    }

    let max = Infinity;
    if ('enumList' in metadata) {
      max = metadata.enumList.reduce<number | undefined>(
        (rawPrevious, current) => {
          const previous = rawPrevious || -Infinity;
          return Math.max(previous, current.length)
        },
        undefined
      ) || max;
    } else if ('maxLength' in metadata) {
      max = metadata.maxLength || max;
    }

    super(min, max);
  }
}
