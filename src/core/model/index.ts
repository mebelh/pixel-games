import { TOnChangeModel } from "@/core/model/interfaces";

export abstract class Model<T extends Model<any>> {
  private subscribers: Array<TOnChangeModel<T>>;

  protected constructor() {
    this.subscribers = [];
  }

  emitChange() {
    this.subscribers.forEach((fn) => {
      fn(this as any);
    });
  }

  subscribeOnChanges(fn: TOnChangeModel<T>): () => void {
    this.subscribers.push(fn);

    return () => {
      this.subscribers = this.subscribers.filter((el) => el !== fn);
    };
  }
}
