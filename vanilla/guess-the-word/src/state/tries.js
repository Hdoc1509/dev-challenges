export let tries = 0;

export const resetTries = () => (tries = 0);
export const increaseTries = () => tries++;
export const hasReachedMaxTries = () => tries === 6;
