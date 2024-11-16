import { getElementById, getElementBySelector } from "@lib/dom";
import cover1URL from "/cover-1.png";
import cover2URL from "/cover-2.png";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "./styles/main.css";

const $playProgress = getElementById("progress-bar", HTMLInputElement);
const $playPauseControl = getElementById(
  "control-play-pause",
  HTMLButtonElement,
);
const $nextControl = getElementById("control-next", HTMLButtonElement);
const $prevControl = getElementById("control-prev", HTMLButtonElement);
const $song = getElementById("song", HTMLAudioElement);
const $songTitle = getElementBySelector(
  ".player-card__title",
  HTMLHeadingElement,
);
const $songAuthor = getElementBySelector(
  ".player-card__author",
  HTMLParagraphElement,
);
const $songCover = getElementBySelector(
  ".player-card__cover > img",
  HTMLImageElement,
);
const $songDuration = getElementBySelector(
  ".player-card__duration",
  HTMLSpanElement,
);

const songs = [
  {
    title: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    url: new URL("/lost-in-city-lights-145038.mp3", import.meta.url).href,
    cover: cover1URL,
  },
  {
    title: "Forest Lullaby",
    artist: "Lesfm",
    url: new URL("/forest-lullaby-110624.mp3", import.meta.url).href,
    cover: cover2URL,
  },
];
const totalSongs = songs.length;
let currentSongIdx = 0;

$song.volume = 0.25;

const PLAY_STATUS = {
  PLAYING: "playing",
  IDLE: "idle",
  STOP: "stop",
};

document.addEventListener("input", (e) => {
  const $target = e.target;

  if ($target === $playProgress) {
    const currentTime = $playProgress.valueAsNumber;
    const progress = (currentTime / Number($playProgress.max)) * 100;

    $playProgress.style.setProperty("--progress-value", `${progress}%`);
  }
});

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

$song.addEventListener("durationchange", () => {
  const duration = $song.duration;
  const minutes = `${Math.floor(duration / 60)}`.padStart(2, "0");
  const seconds = Math.round(duration % 60);

  $songDuration.textContent = `${minutes}:${seconds}`;
});
