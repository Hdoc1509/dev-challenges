import { $song, $songTitle, $songAuthor, $songCover } from "@/song.js";
import { songs, totalSongs } from "@/consts.js";

let currentSongIdx = 0;

export function handleGoNextSong() {
  const newSongIdx = currentSongIdx === totalSongs - 1 ? 0 : currentSongIdx + 1;

  // TODO: encapsulate this logic in a function. receive the new song as
  // argument
  const { title, artist, url, cover } = songs[newSongIdx];

  $songTitle.textContent = title;
  $songAuthor.textContent = artist;
  $songCover.src = cover;
  $song.src = url; // triggers `durationchange` event of $song element

  currentSongIdx = newSongIdx;
}
