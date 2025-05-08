import { showAlert } from "@lib/alert";
import { addDiscoveredWord } from "@/services/saved-words/add";
import { discoveredWords } from "@/state/discovered-words";
import { removeAvailableWord, words } from "@/state/words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { hasInitialStatsInitialized } from "@/state/stats";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { showCorrectWord } from "@/ui/word";
import { DefinitionPages } from "@/ui/definition/pages";
import { renderCompletedDifficulty } from "@/ui/definition/difficulty";
import { $definitionSection } from "@/ui/definition/elements";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

export async function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  if (InsaneDifficulty.isApplied()) {
    const { hideTimerBar } = await import("@/ui/timer");
    hideTimerBar();
  }
  $reset.disabled = true;
  showCorrectWord();
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");

  const totalByDifficulty = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];

  if (!discoveredWords.has(currentWord)) {
    // TODO: move to handleNewWord()
    // NOTE: render of `DefinitionPages` depends on discoveredWords
    const { completed } = addDiscoveredWord(currentWord, { difficulty });

    $definitionSection.setAttribute("data-active", "");
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
          count: totalByDifficulty - words.length,
          total: totalByDifficulty,
        });
      });

    if (completed && words.length === 0)
      import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
        handleDifficultyComplete(),
      );
  } else if (!hasCompletedAllDifficulties({ word: currentWord })) {
    // TODO: move to handleCompletedDifficulty()
    const { completed } = addDiscoveredWord(currentWord, { difficulty });

    await removeAvailableWord(currentWord, { difficulty });

    if (hasInitialStatsInitialized)
      await import("@/ui/stats/current").then(({ renderCurrentStats }) =>
        renderCurrentStats({
          category: difficulty,
          count: totalByDifficulty - words.length,
          total: totalByDifficulty,
        }),
      );

    if (completed && words.length === 0)
      import("./difficulty-complete").then(({ handleDifficultyComplete }) =>
        handleDifficultyComplete(),
      );

    if (renderCompletedDifficulty({ word: currentWord, difficulty }))
      $definitionSection.setAttribute("data-active", "");
  }
}
