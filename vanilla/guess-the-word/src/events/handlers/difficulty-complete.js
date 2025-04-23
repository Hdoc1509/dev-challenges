import { $randomWord } from "@/ui/actions";

export function handleDifficultyComplete() {
  $randomWord.disabled = true;
  // TODO:
  // - create word letters with `congrats` as selected word
  // - hide `info` and `typing` section
  // - show `difficulty-completed` section
  // - update completed words of all difficulties in Stats tab
  // - disable difficulty option from Difficulty tab
  console.log("TODO: showCompletedDifficultyMessage");
}
