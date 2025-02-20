import { setDifficulty, setNextDifficulty } from "@/state/difficulty";
import { maxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import { applyHardDifficulty } from "@/utils/difficulty/hard";
import { applyNormalDifficulty } from "@/utils/difficulty/normal";
import { applyMasterDifficulty } from "@/utils/difficulty/master";
import { applyExtremeDifficulty } from "@/utils/difficulty/extreme";
import { $resetsContainer } from "@/ui/resets";
import { DIFFICULTY, TRIES, WORDS } from "@/consts";

/**
 * @param {Object} params
 * @param {import("@/consts").Difficulty} params.difficulty
 */
export function handleGameReady({ difficulty }) {
  setDifficulty(difficulty);
  setNextDifficulty(null);

  if (
    (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) &&
    maxTries !== TRIES.MAX
  ) {
    applyNormalDifficulty();
    setWords(WORDS.ALL);
    $resetsContainer.removeAttribute("data-active");
  } else if (difficulty === DIFFICULTY.HARD) {
    applyHardDifficulty();
    setWords(WORDS.ALL);
    $resetsContainer.removeAttribute("data-active");
  } else if (difficulty === DIFFICULTY.MASTER) {
    applyHardDifficulty();
    applyMasterDifficulty();
    setWords(WORDS.ALL);
  } else if (difficulty === DIFFICULTY.EXTREME) {
    applyHardDifficulty();
    applyMasterDifficulty();
    applyExtremeDifficulty();
  }
}
