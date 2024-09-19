export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});
export type Status = (typeof STATUS)[keyof typeof STATUS];

export type FetchingState<T extends Record<string, unknown>> =
  | ({
      status: typeof STATUS.IDLE | typeof STATUS.LOADING;
      error?: Error;
    } & Partial<T>)
  | ({ status: typeof STATUS.SUCCESS; error?: Error } & T)
  | ({ status: typeof STATUS.ERROR; error: Error } & Partial<T>);
