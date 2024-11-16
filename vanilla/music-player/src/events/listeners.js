import { $playPauseControl, $nextControl } from "@/controls.js";
import { $playProgress } from "@/progress.js";
import {
  $song,
  $songDuration,
  $songTitle,
  $songAuthor,
  $songCover,
} from "@/song.js";
import { songs, totalSongs } from "@/consts.js";

const PLAY_STATUS = {
  PLAYING: "playing",
  IDLE: "idle",
  STOP: "stop",
};
let currentSongIdx = 0;

export function setupEventListeners() {
  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $playPauseControl) {
      const currentStatus = $playPauseControl.dataset.status;

      if (currentStatus == null || currentStatus === PLAY_STATUS.STOP) {
        $playPauseControl.dataset.status = PLAY_STATUS.PLAYING;
        $song.play();
        return;
      }
      if (currentStatus === PLAY_STATUS.PLAYING) {
        $playPauseControl.dataset.status = PLAY_STATUS.STOP;
        $song.pause();
        return;
      }
    }

    if ($target === $nextControl) {
      const newSongIdx =
        currentSongIdx === totalSongs - 1 ? 0 : currentSongIdx + 1;

      // TODO: encapsulate this logic in a function. receive the new song as
      // argument
      const { title, artist, url, cover } = songs[newSongIdx];

      $songTitle.textContent = title;
      $songAuthor.textContent = artist;
      $songCover.src = cover;
      $song.src = url; // triggers `durationchange` event

      currentSongIdx = newSongIdx;
    }
  });

  $playProgress.addEventListener("input", () => {
    const currentTime = $playProgress.valueAsNumber;
    const progress = (currentTime / Number($playProgress.max)) * 100;

    $playProgress.style.setProperty("--progress-value", `${progress}%`);
  });

  $song.addEventListener("durationchange", () => {
    const duration = $song.duration;
    const minutes = `${Math.floor(duration / 60)}`.padStart(2, "0");
    const seconds = Math.round(duration % 60);

    $songDuration.textContent = `${minutes}:${seconds}`;
  });
}
