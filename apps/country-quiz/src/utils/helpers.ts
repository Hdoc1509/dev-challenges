export const randomSort = <T>(arr: T[]): T[] =>
  structuredClone(arr).sort(() => Math.random() - 0.5);

export const toTitleCase = (string: string) =>
  string
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
