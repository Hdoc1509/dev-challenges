import { $song, $songTitle, $songAuthor, $songCover } from "@/song.js";

/**
 * @typedef {Object} Song
 * @property {string} title
 * @property {string} artist
 * @property {string} url
 * @property {string} cover
 */

/** @param {Song} song */
export function renderSongData({ title, artist, url, cover }) {
  $songTitle.textContent = title;
  $songAuthor.textContent = artist;
  $songCover.src = cover;
  $song.src = url; // NOTE: triggers `durationchange` event of $song element
}

/** @param {number} timeSeconds */
export function formatTime(timeSeconds) {
  const minutes = `${Math.floor(timeSeconds / 60)}`.padStart(2, "0");
  const seconds = `${Math.round(timeSeconds % 60)}`.padStart(2, "0");

  return `${minutes}:${seconds}`;
}
