import { formatTime } from "@/utils";
import { $playProgress } from "@/progress.js";
import { $song, $songCurrentTime } from "@/song.js";

export function handleSongTimeUpdate() {
  const currentTime = $song.currentTime;
  const progress = (currentTime / Number($playProgress.max)) * 100;

  $songCurrentTime.textContent = formatTime(currentTime);
  $playProgress.value = currentTime.toString();
  $playProgress.style.setProperty("--progress-value", `${progress}%`);
}
