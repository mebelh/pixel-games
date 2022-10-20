export class ObservablePrimitive<T extends string | number | undefined | null> {
  private _value: T;
  private _prevValue: T;

  private subscribers: Array<(newValue: T, prevValue: T) => void>;

  constructor(initialValue: T) {
    this.subscribers = [];
    this._prevValue = initialValue;
    this._value = initialValue;
  }

  get prevValue(): T {
    return this._prevValue;
  }

  set prevValue(value: T) {
    console.error("Error! Cant set previous value!!!", value);

    throw new Error("Cant set prevValue");
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._prevValue = this._value;
    this._value = value;

    this.emitChange();
  }

  on(fn: (newValue: T, prevValue: T) => void): () => void {
    this.subscribers.push(fn);

    return () => {
      this.subscribers = this.subscribers.filter((el) => el !== fn);
    };
  }

  emitChange() {
    this.subscribers.forEach((fn) => {
      fn(this._value, this._prevValue);
    });
  }
}
