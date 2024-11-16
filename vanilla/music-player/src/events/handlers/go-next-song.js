import { renderSongData } from "@/utils";
import { songs, totalSongs } from "@/consts.js";

let currentSongIdx = 0;

export function handleGoNextSong() {
  const newSongIdx = currentSongIdx === totalSongs - 1 ? 0 : currentSongIdx + 1;
  const newSong = songs[newSongIdx];

  renderSongData(newSong);

  currentSongIdx = newSongIdx;
}
