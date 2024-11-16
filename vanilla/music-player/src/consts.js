import cover1URL from "/cover-1.png";
import cover2URL from "/cover-2.png";

export const songs = [
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

export const totalSongs = songs.length;
