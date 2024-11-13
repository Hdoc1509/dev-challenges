import { getElementById } from "@lib/dom";
import "@fontsource-variable/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "./styles/main.css";

// TODO: handle play/pause/next/prev logic
//  - https://vite.dev/guide/assets.html#new-url-url-import-meta-url
//  - https://github.com/krau5/pomo/pull/9/files
//  - https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

const $playProgress = getElementById("progress-bar", HTMLInputElement);

document.addEventListener("input", (e) => {
  const $target = e.target;

  if ($target instanceof HTMLInputElement) {
    if ($target === $playProgress) {
      const currentTime = $target.valueAsNumber;
      const progress = (currentTime / Number($target.max)) * 100;

      $target.style.setProperty("--progress-value", `${progress}%`);
    }
  }
});
