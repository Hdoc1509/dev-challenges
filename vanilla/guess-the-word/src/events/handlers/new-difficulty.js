import { addDiscoveredWord } from "@/services/saved-words/add";
import { removeAvailableWord, words } from "@/state/words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { hasInitialStatsInitialized } from "@/state/stats";
import { renderCompletedDifficulty } from "@/ui/definition/difficulty";
import { $definitionSection } from "@/ui/definition/elements";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";
import { CLASSES } from "@/consts/css-classes";

export async function handleNewDifficulty() {
  const { completed } = addDiscoveredWord(currentWord, { difficulty });
  const totalWords = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];

  await removeAvailableWord(currentWord, { difficulty });

  if (hasInitialStatsInitialized)
    await import("@/ui/stats/current").then(({ renderCurrentStats }) =>
      renderCurrentStats({
        category: difficulty,
        count: totalWords - words.length,
        total: totalWords,
      }),
    );

  if (completed && words.length === 0)
    import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
      handleDifficultyComplete(),
    );

  if (renderCompletedDifficulty({ word: currentWord, difficulty }))
    $definitionSection.classList.remove(CLASSES.HIDDEN);
}
