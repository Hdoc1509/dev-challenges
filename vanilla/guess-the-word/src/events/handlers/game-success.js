import { showAlert } from "@lib/alert";
import { addDiscoveredWord } from "@/services/saved-words/add";
import { discoveredWords } from "@/state/discovered-words";
import { removeAvailableWord, words } from "@/state/words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { hasInitialStatsInitialized } from "@/state/stats";
import { handleNewWord } from "./new-word";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { InsaneDifficulty } from "@/utils/difficulty/insane";
import { showCorrectWord } from "@/ui/word";
import { renderCompletedDifficulty } from "@/ui/definition/difficulty";
import { $definitionSection } from "@/ui/definition/elements";
import { $hints, $hintsContent } from "@/ui/hints";
import { $reset } from "@/ui/actions";
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

  const totalWords = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];

  if (!discoveredWords.has(currentWord)) {
    handleNewWord(currentWord, { totalWords });
  } else if (!hasCompletedAllDifficulties({ word: currentWord })) {
    // TODO: move to handleCompletedDifficulty()
    const { completed } = addDiscoveredWord(currentWord, { difficulty });

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
      $definitionSection.setAttribute("data-active", "");
  }
}
