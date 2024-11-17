import { handlePlayPause } from "./handlers/play-pause";
import {
  handleGoNextSong,
  handleGoPrevSong,
} from "./handlers/go-next-prev-song.js";
import { handleChangePlayTime } from "./handlers/change-play-time";
import { handleSongChange } from "./handlers/song-change";
import { handleSongTimeUpdate } from "./handlers/song-time-update";
import { $playPauseControl, $nextControl, $prevControl } from "@/controls.js";
import { $playProgress } from "@/progress.js";
import { $song } from "@/song.js";

export function setupEventListeners() {
  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $playPauseControl) return handlePlayPause();

    if ($target === $nextControl) return handleGoNextSong();

    if ($target === $prevControl) return handleGoPrevSong();
  });

  $playProgress.addEventListener("input", () => handleChangePlayTime());

  $song.addEventListener("durationchange", () => handleSongChange());
  $song.addEventListener("timeupdate", () => handleSongTimeUpdate());
  $song.addEventListener("ended", () => handleGoNextSong());
}
