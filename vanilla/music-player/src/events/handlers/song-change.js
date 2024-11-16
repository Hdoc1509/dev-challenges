import { $song, $songDuration } from "@/song.js";

export function handleSongChange() {
  const duration = $song.duration;
  const minutes = `${Math.floor(duration / 60)}`.padStart(2, "0");
  const seconds = Math.round(duration % 60);

  $songDuration.textContent = `${minutes}:${seconds}`;
}
