import { formatTime } from "@/utils";
import { $song, $songDuration } from "@/song.js";
import { $playProgress } from "@/progress";

export function handleSongChange() {
  const duration = $song.duration;

  $songDuration.textContent = formatTime(duration);
  $playProgress.max = `${Math.round(duration)}`;
}
