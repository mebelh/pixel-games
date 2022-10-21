export type TObservableFn<T> = (newValue: T, oldValue: T) => void;

export type TObservableSubscribers<T> = {
  [key in keyof T]: Array<TObservableFn<T[keyof T]>>;
};

export type TObservableOn<T> = (
  key: keyof T,
  fn: TObservableFn<T[keyof T]>
) => () => void;
