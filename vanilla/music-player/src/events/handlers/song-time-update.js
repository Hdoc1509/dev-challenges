import { formatTime } from "@/utils";
import { $playProgress } from "@/progress.js";
import { $song, $songCurrentTime } from "@/song.js";

let previousSecond = 0;

export function handleSongTimeUpdate() {
  const currentTime = $song.currentTime;
  const currentSecond = parseInt(`${currentTime}`);
  const progress = (currentTime / Number($playProgress.max)) * 100;

  $playProgress.style.setProperty("--progress-value", `${progress}%`);

  if (currentSecond === previousSecond) return;

  previousSecond = currentSecond;
  $songCurrentTime.textContent = formatTime(currentTime);
  $playProgress.valueAsNumber = currentTime;
}
