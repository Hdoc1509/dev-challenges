import { addDiscoveredWord } from "@/services/saved-words/add";
import { discoveredWords } from "@/state/discovered-words";
import { removeAvailableWord, words } from "@/state/words";
import { difficulty } from "@/state/difficulty";
import { hasInitialStatsInitialized } from "@/state/stats";
import { DefinitionPages } from "@/ui/definition/pages";
import { $definitionSection } from "@/ui/definition/elements";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";

/** @param {string} newWord
 * @param {{ totalWords: number }} extraParams */
export async function handleNewWord(newWord, { totalWords }) {
  // NOTE: render of `DefinitionPages` depends on discoveredWords
  const { completed } = addDiscoveredWord(newWord, { difficulty });

  $definitionSection.setAttribute("data-active", "");
  await removeAvailableWord(newWord, { difficulty });
  DefinitionPages.prepend(newWord);

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
