import { SerializableTypes } from 'src/models/serialize/value/SerializableTypes';
import { AbstractSerializer } from 'src/models/serialize/AbstractSerializer';

export abstract class AbstractValueSerializer extends AbstractSerializer<SerializableTypes> {}
