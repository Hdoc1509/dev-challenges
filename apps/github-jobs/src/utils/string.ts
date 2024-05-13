export const sanitizeString = (str: string) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\.|-|,|\(|\)/g, "")
    .replace(/\s{2,}/g, " ");
};
