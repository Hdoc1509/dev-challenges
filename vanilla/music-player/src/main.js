import { setupEventListeners } from "./events/listeners.js";
import { $song } from "./song.js";
import { songs } from "./consts.js";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  $song.src = songs[0].url;
  setupEventListeners();
});
