import { AbstractIOContext } from 'src/models/serialize/internal/io-context/AbstractIOContext';
import { ContextDataType } from 'src/models/serialize/internal/io-context/ContextDataType';
import { NonEmptyArray } from 'src/types/NonEmptyArray';

class PathIOContext extends AbstractIOContext {
  public constructor() {
    super('path');
  }

  mapTypeToDataTypeInContext(): NonEmptyArray<ContextDataType> {
    return [ContextDataType.string];
  }
}

export const path = new PathIOContext();
