export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});
export type Status = (typeof STATUS)[keyof typeof STATUS];

type Never<T extends Record<string, unknown>> = { [K in keyof T]?: never };

export type FetchingState<T extends Record<string, unknown>> =
  | ({
      status: typeof STATUS.IDLE | typeof STATUS.LOADING;
      error?: never;
    } & Never<T>)
  | ({ status: typeof STATUS.SUCCESS; error?: never } & T)
  | ({ status: typeof STATUS.ERROR; error: Error } & Never<T>);
