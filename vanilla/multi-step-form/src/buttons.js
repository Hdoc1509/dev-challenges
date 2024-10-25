const $unsafeSubmitRegisterButton = document.getElementById("submit-register");
if (!($unsafeSubmitRegisterButton instanceof HTMLButtonElement))
  throw new Error(`missing '#submit-register' button element`);
export const $submitRegisterButton = $unsafeSubmitRegisterButton;

export const $unsafeRestartButton = document.getElementById("restart");
if (!($unsafeRestartButton instanceof HTMLButtonElement))
  throw new Error(`missing '#restart' button element`);
export const $restartButton = $unsafeRestartButton;
