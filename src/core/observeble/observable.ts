import {
  TObservableFn,
  TObservableSubscribers,
  TObservableOn,
} from "./interfaces";

export function makeObservable<T extends Object>(target: T): TObservableOn<T> {
  const keys: Array<keyof T> = Object.keys(target) as Array<keyof T>;
  const values: T = {
    ...target,
  };

  const subscribers = Object.keys(target).reduce(
    (acc, key) => ({
      ...acc,
      [key]: [],
    }),
    {}
  ) as TObservableSubscribers<T>;

  const emitChange = (key: keyof T, newValue: T[keyof T]) => {
    subscribers[key].forEach((fn) => {
      fn(newValue, values[key]);
    });
  };

  keys.forEach((key) => {
    Object.defineProperty(target, key, {
      get() {
        return values[key];
      },
      set(v) {
        emitChange(key, v);
        values[key] = v;
      },
    });
  });

  return (key: keyof T, fn: TObservableFn<T[keyof T]>) => {
    subscribers[key].push(fn);

    return () => {
      subscribers[key] = subscribers[key].filter((el) => el !== fn);
    };
  };
}
