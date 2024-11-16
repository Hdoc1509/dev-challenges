import { $playProgress } from "@/progress.js";
import { $song } from "@/song.js";

export function handleSongTimeUpdate() {
  const currentTime = $song.currentTime;
  const progress = (currentTime / Number($playProgress.max)) * 100;

  $playProgress.value = currentTime.toString();
  $playProgress.style.setProperty("--progress-value", `${progress}%`);
}
