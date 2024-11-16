import { handlePlayPause } from "./handlers/play-pause";
import { handleGoNextSong } from "./handlers/go-next-song";
import { handleChangePlayTime } from "./handlers/change-play-time";
import { handleSongChange } from "./handlers/song-change";
import { $playPauseControl, $nextControl } from "@/controls.js";
import { $playProgress } from "@/progress.js";
import { $song } from "@/song.js";

export function setupEventListeners() {
  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $playPauseControl) return handlePlayPause();

    if ($target === $nextControl) return handleGoNextSong();
  });

  $playProgress.addEventListener("input", () => handleChangePlayTime());

  $song.addEventListener("durationchange", () => handleSongChange());
}
