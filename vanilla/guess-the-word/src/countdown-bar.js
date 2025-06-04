import { getElementBySelector } from "@lib/dom";

const CSS = Object.freeze({
  CLASSES: {
    BAR: "countdown-bar",
    TRACK: "countdown-bar__track",
    ALERT: "countdown-bar__alert",
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
 * @param {{ onAlert?: (duration: number) => string}} options */
const getCountdownBarElements = ($countdownBar, { onAlert }) => {
  const $track = getElementBySelector(
    `:scope > .${CSS.CLASSES.TRACK}`,
    HTMLDivElement,
    $countdownBar,
  );
  let $label;

  if (onAlert != null)
    $label = getElementBySelector(
      `:scope > .${CSS.CLASSES.ALERT}.visually-hidden[role='alert']`,
      HTMLSpanElement,
      $countdownBar,
    );

  return { $track, $label };
};

export class CountdownBar {
  #$track;
  #onAlert;
  #$label;
  #controller = new AbortController();
  #enabled = false;

  // TODO: move options typing to another file
  /**
   * @param {HTMLElement} countdownBarElement
   * @param {Object} options
   * @param {(duration: number) => string} [options.onAlert]
   * Enables notifications for accessibility purposes
   */
  constructor(countdownBarElement, { onAlert } = {}) {
    validateTimerElement(countdownBarElement);
    const { $track, $label } = getCountdownBarElements(countdownBarElement, {
      onAlert,
    });

    this.#$track = $track;
    this.#onAlert = onAlert;
    this.#$label = $label;
  }

  /** If needed, enables the countdown before starting it. Also removes previous
   * register of `onTimesUp` handler before registering the new one
   * @param {Object} params
   * @param {number} params.duration Countdown duration in seconds
   * @param {() => void} params.onTimesUp Handler called once countdown finishes
   */
  // TODO: move method typing to another file
  start({ duration, onTimesUp }) {
    this.#controller.abort();
    this.#controller = new AbortController();

    // TODO: move this logic into a separate util: resetCountdown({ $track })
    this.#$track.classList.remove(CSS.CLASSES.TRACK);
    void this.#$track.offsetWidth;
    this.#$track.classList.add(CSS.CLASSES.TRACK);

    this.#$track.addEventListener("animationend", onTimesUp, {
      once: true,
      signal: this.#controller.signal,
    });
    this.#$track.style.setProperty(CSS.VARS.DURATION, `${duration}s`);
    if (!this.#enabled) {
      this.#enabled = true;
      this.#$track.setAttribute("data-active", "");
    }
    if (this.#onAlert != null && this.#$label != null)
      this.#$label.textContent = this.#onAlert(duration);
  }

  /** Aborts the countdown and its `onTimesUp` handler registered by `start()`
   * method */
  disable() {
    this.#controller.abort();
    if (this.#enabled) {
      this.#enabled = false;
      this.#$track.removeAttribute("data-active");
    }
  }
}
