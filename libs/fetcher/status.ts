export const STATUS = Object.freeze({
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
});
export type Status = (typeof STATUS)[keyof typeof STATUS];
