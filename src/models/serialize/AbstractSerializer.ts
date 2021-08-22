export abstract class AbstractSerializer<JsType> {
  public abstract unserialize(value: Buffer): JsType;

  public abstract serialize(value: JsType): Buffer;
}
