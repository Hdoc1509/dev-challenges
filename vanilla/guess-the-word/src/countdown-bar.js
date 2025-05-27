import { getElementBySelector } from "@lib/dom";
// TODO: add test by using playwright

const CSS = Object.freeze({
  CLASSES: {
    BAR: "countdown-bar",
    TRACK: "countdown-bar__track",
    LABEL: "countdown-bar__label",
  },
  VARS: {
    DURATION: "--countdown-bar-duration",
  },
});

/** @param {HTMLElement} $countdownBar */
const validateTimerElement = ($countdownBar) => {
  if (!$countdownBar.classList.contains(CSS.CLASSES.BAR))
    throw new Error(`"timerElement" must have "${CSS.CLASSES.BAR}" class`);

  return $countdownBar;
};

/** @param {HTMLElement} $countdownBar
 * @param {{ onLabel?: (duration: number) => string}} options */
const getCountdownBarElements = ($countdownBar, { onLabel }) => {
  const $track = getElementBySelector(
    `:scope > .${CSS.CLASSES.TRACK}`,
    HTMLDivElement,
    $countdownBar,
  );
  let $label;

  if (onLabel != null)
    $label = getElementBySelector(
      `:scope > .${CSS.CLASSES.LABEL}.visually-hidden[role='alert']`,
      HTMLSpanElement,
      $countdownBar,
    );

  return { $track, $label };
};

export class CountdownBar {
  #$track;
  #onLabel;
  #$label;
  #controller = new AbortController();
  #enabled = false;

  // TODO: move options typing to another file
  /**
   * @param {HTMLElement} countdownBarElement
   * @param {Object} options
   * @param {(duration: number) => string} [options.onLabel]
   * Enables notifications for accessibility purposes
   */
  constructor(countdownBarElement, { onLabel } = {}) {
    validateTimerElement(countdownBarElement);
    const { $track, $label } = getCountdownBarElements(countdownBarElement, {
      onLabel,
    });

    this.#$track = $track;
    this.#onLabel = onLabel;
    this.#$label = $label;
  }

  /** If needed, enables the countdown before starting it. Also removes previous
   * register of `onEnd` handler before registering the new one
   * @param {Object} params
   * @param {number} params.duration Countdown duration in seconds
   * @param {() => void} params.onEnd Handler called once countdown finishes
   */
  // TODO: move method typing to another file
  start({ duration, onEnd }) {
    this.#controller.abort();
    this.#controller = new AbortController();

    // TODO: move this logic into a separate util: resetCountdown({ $track })
    this.#$track.classList.remove(CSS.CLASSES.TRACK);
    void this.#$track.offsetWidth;
    this.#$track.classList.add(CSS.CLASSES.TRACK);

    this.#$track.addEventListener("animationend", onEnd, {
      once: true,
      signal: this.#controller.signal,
    });
    this.#$track.style.setProperty(CSS.VARS.DURATION, `${duration}s`);
    if (!this.#enabled) {
      this.#enabled = true;
      this.#$track.setAttribute("data-active", "");
    }
    if (this.#onLabel != null && this.#$label != null)
      this.#$label.textContent = this.#onLabel(duration);
  }

  /** Aborts the countdown and its `onEnd` handler registered by `start()`
   * method */
  disable() {
    this.#controller.abort();
    if (this.#enabled) {
      this.#enabled = false;
      this.#$track.removeAttribute("data-active");
    }
  }
}
