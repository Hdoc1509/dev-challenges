// https://github.com/colinhacks/zod/blob/1f4f0dacf313a2dba45563d78171e6f016096925/src/types.ts#L599
export const EMAIL_REGEX =
  /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

export const NAME_REGEX = /^[A-Z ]+$/i;
