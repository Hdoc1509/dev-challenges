export type PromiseWithError<T> = Promise<[Error] | [null, T]>;

export type Status = "idle" | "loading" | "success" | "error" | "over";
