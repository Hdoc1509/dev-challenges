import cover1URL from "/cover-1.png";
import song1URL from "/lost-in-city-lights-145038.mp3";
import cover2URL from "/cover-2.png";
import song2URL from "/forest-lullaby-110624.mp3";

export const songs = [
  {
    title: "Lost in the City Lights",
    artist: "Cosmo Sheldrake",
    url: song1URL,
    cover: cover1URL,
  },
  {
    title: "Forest Lullaby",
    artist: "Lesfm",
    url: song2URL,
    cover: cover2URL,
  },
];

export const totalSongs = songs.length;

export const PLAY_STATUS = {
  PLAYING: "playing",
  IDLE: "idle",
  STOP: "stop",
};
