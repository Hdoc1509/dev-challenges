import { formatTime } from "@/utils";
import { $song, $songDuration } from "@/song.js";

export function handleSongChange() {
  const duration = $song.duration;

  $songDuration.textContent = formatTime(duration);
}
