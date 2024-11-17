import { $playProgress } from "@/progress.js";
import { $song } from "@/song";

export function handleChangePlayTime() {
  const currentTime = $playProgress.valueAsNumber;

  $song.currentTime = currentTime;
}
