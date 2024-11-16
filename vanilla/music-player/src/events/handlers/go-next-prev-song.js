import { renderSongData } from "@/utils";
import { $song } from "@/song";
import { $playPauseControl } from "@/controls";
import { PLAY_STATUS, songs, totalSongs } from "@/consts.js";

let currentSongIdx = 0;

export function handleGoNextSong() {
  const newSongIdx = currentSongIdx === totalSongs - 1 ? 0 : currentSongIdx + 1;
  const newSong = songs[newSongIdx];

  renderSongData(newSong);
  $playPauseControl.dataset.status = PLAY_STATUS.PLAYING;
  $song.play();

  currentSongIdx = newSongIdx;
}

export function handleGoPrevSong() {
  const newSongIdx = currentSongIdx === 0 ? totalSongs - 1 : currentSongIdx - 1;
  const newSong = songs[newSongIdx];

  renderSongData(newSong);
  $playPauseControl.dataset.status = PLAY_STATUS.PLAYING;
  $song.play();

  currentSongIdx = newSongIdx;
}
