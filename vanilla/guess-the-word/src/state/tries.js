import { IS_DEV } from "@/config";
import { MAX_TRIES } from "@/consts";

export let tries = 0;

export const resetTries = () => {
  tries = 0;
  if (IS_DEV) console.log({ tries });
};

export const increaseTries = () => {
  tries++;
  if (IS_DEV) console.log({ tries });
};

export const hasReachedMaxTries = () => tries === MAX_TRIES;
