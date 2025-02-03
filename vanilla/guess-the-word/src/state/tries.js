import { IS_DEV } from "@/config";

export let tries = 0;

export const resetTries = () => {
  tries = 0;
  if (IS_DEV) console.log({ tries });
};

export const increaseTries = () => {
  tries++;
  if (IS_DEV) console.log({ tries });
};
