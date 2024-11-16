import { $playProgress } from "@/progress.js";

export function handleChangePlayTime() {
  const currentTime = $playProgress.valueAsNumber;
  const progress = (currentTime / Number($playProgress.max)) * 100;

  $playProgress.style.setProperty("--progress-value", `${progress}%`);
}
