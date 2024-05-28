export const randomSort = <T>(arr: T[]): T[] =>
  structuredClone(arr).sort(() => Math.random() - 0.5);

export const randomElement = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const toTitleCase = (string: string) =>
  string
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");

export const getResultMessage = ({
  correct,
  total,
}: {
  correct: number;
  total: number;
}) => {
  if (total === correct) return "You are a legend";

  const percent = (correct / total) * 100;
  if (percent <= 20) return "You need to study more";
  if (percent <= 40) return "Better luck next time";
  if (percent <= 60) return "You can do it better";
  if (percent <= 80) return "You did it well";
  return "Congratulations";
};
