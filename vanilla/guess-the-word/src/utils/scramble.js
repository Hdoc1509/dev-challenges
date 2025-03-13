const randomSort = () => Math.random() - 0.5;

/** @param {string} word */
export function scrambleWord(word) {
  const letters = word.split("");
  let scrambled = letters.sort(randomSort);

  while (scrambled.join("") === word) scrambled = letters.sort(randomSort);

  return scrambled.join("");
}
