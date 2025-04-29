import { showAlert } from "@lib/alert";
import { addDiscoveredWord } from "@/services/saved-words/add";
import { discoveredWords } from "@/state/discovered-words";
import { removeAvailableWord, words } from "@/state/words";
import { currentWord } from "@/state/current-word";
import { difficulty } from "@/state/difficulty";
import { handleDifficultyComplete } from "./difficulty-complete";
import { hasCompletedAllDifficulties } from "@/utils/difficulty/completed";
import { showCorrectWord } from "@/ui/word";
import { hideTimerBar } from "@/ui/timer";
import { DefinitionPages } from "@/ui/definition/pages";
import { renderCompletedDifficulty } from "@/ui/definition/difficulty";
import { $definitionSection } from "@/ui/definition/elements";
import { $hints, $hintsContent } from "@/ui/hints";
import { renderCurrentStats } from "@/ui/stats/current";
import { $reset } from "@/ui/actions";
import { STATS_CATEGORY_TOTAL } from "@/consts/stats";
import { TOTAL_WORDS } from "@/consts/words/total";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

export function handleGameSuccess() {
  showAlert({ color: "success", text: "🎉 Success!" });
  hideTimerBar();
  $reset.disabled = true;
  showCorrectWord();
  $hints.removeAttribute("data-active");
  $hintsContent.removeAttribute("data-active");

  if (!discoveredWords.has(currentWord)) {
    const totalByDifficulty = TOTAL_WORDS[DIFFICULTY_GROUP[difficulty]];

    $definitionSection.setAttribute("data-active", "");
    // NOTE: render of definition's difficulty depends on discoveredWords
    addDiscoveredWord(currentWord, { difficulty });
    removeAvailableWord(currentWord, { difficulty });
    DefinitionPages.prepend(currentWord);
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
  } else if (!hasCompletedAllDifficulties({ word: currentWord })) {
    const { completed } = addDiscoveredWord(currentWord, { difficulty });
    removeAvailableWord(currentWord, { difficulty });
    // TODO: render `${difficulty} stats`

    if (completed && words.length === 0) handleDifficultyComplete();

    if (renderCompletedDifficulty({ word: currentWord, difficulty }))
      $definitionSection.setAttribute("data-active", "");
  }
}
