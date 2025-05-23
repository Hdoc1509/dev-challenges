import { validateDuration } from "./validation";
import { closeAlert, getAlertElements, resetAnimation } from "./utils";
import { COLORS } from "./consts";

// type AlertOptions = {
//   /** Enable/disable accessibility features */
//   a11y?: boolean;
// }

type ShowOptions = {
  color: (typeof COLORS)[keyof typeof COLORS];
  text: string;
};

export class Alert {
  #$alert: HTMLDivElement;
  #$text: HTMLSpanElement;
  #$timerBar: HTMLDivElement;
  static COLORS = COLORS;

  constructor(alertElement: HTMLDivElement /*, options: AlertOptions */) {
    this.#$alert = alertElement;
    // validateAlertElement(alertElement);

    const { $text, $timerBar } = getAlertElements(alertElement, { a11y: true });

    this.#$text = $text;
    this.#$timerBar = $timerBar;

    setTimeout(() => {
      validateDuration($timerBar);
    }, 0);
  }

  close(onClose?: () => void) {
    closeAlert(this.#$alert, onClose);
  }

  reset() {
    if (this.#$alert.classList.contains("alert--open"))
      return closeAlert(this.#$alert, () => resetAnimation(this.#$timerBar));

    resetAnimation(this.#$timerBar);
  }

  show({ color, text }: ShowOptions) {
    this.#$alert.classList.add("alert--open");
    this.#$alert.setAttribute("data-color", color);
    this.#$text.textContent = text;
    this.#$timerBar.addEventListener(
      "animationend",
      () => {
        this.close();
      },
      { once: true },
    );
  }
}
