export type PromiseWithError<T> = Promise<[Error] | [null, T]>;
