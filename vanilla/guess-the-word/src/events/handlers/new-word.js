import { addDiscoveredWord } from "@/services/saved-words/add";
import { discoveredWords } from "@/state/discovered-words";
import { removeAvailableWord, words } from "@/state/words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { hasInitialStatsInitialized } from "@/state/stats";
import { DefinitionPages } from "@/ui/definition/pages";
import { $definitionSection } from "@/ui/definition/elements";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";
import { CLASSES } from "@/consts/css-classes";

export async function handleNewWord() {
  // NOTE: render of `DefinitionPages` depends on discoveredWords
  const { completed } = addDiscoveredWord(currentWord, { difficulty });
  const totalWords = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];

  $definitionSection.classList.remove(CLASSES.HIDDEN);
  await removeAvailableWord(currentWord, { difficulty });
  DefinitionPages.prepend(currentWord);

  if (hasInitialStatsInitialized)
    import("@/ui/stats/current").then(({ renderCurrentStats }) => {
      renderCurrentStats({
        category: STATS_CATEGORY_TOTAL,
        count: discoveredWords.size,
        total: TOTAL_WORDS.ALL,
      });
      renderCurrentStats({
        category: difficulty,
        count: totalWords - words.length,
        total: totalWords,
      });
    });

  if (completed && words.length === 0)
    import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
      handleDifficultyComplete(),
    );
}
