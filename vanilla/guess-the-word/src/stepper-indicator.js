import { getAllElementsBySelector } from "@lib/dom";

// TODO: create @lib/stepper-indicator and move this file there
// take styles of stepper.css and move them too
const CLASSES = Object.freeze({
  STEPPER: "stepper-indicator",
  STEP: "stepper-indicator__step",
});
const ATTRIBUTES = Object.freeze({
  STEP: Object.freeze({
    COMPLETED: "data-completed",
    // TODO: can I use aria-current?
    // CURRENT: Object.freeze({
    //   NAME: "aria-current",
    //   VALUE: "step",
    // })
  }),
});
const STEP = Object.freeze({
  DEFAULT: 0,
  FIRST: 1,
  MIN: 2,
});
const ERROR = Object.freeze({
  PREFIX: "[StepperIndicator]",
  CONTAINER: Object.freeze({
    MISSING: 'Missing "$container" argument',
    NOT_HTML_ELEMENT: '"$container" argument should be an HTMLElement',
  }),
  STEP: Object.freeze({
    MIN: "At least two steps are required",
    ONLY_TWO: "There are only two steps",
    NO_NEXT: "There are no steps to go next",
  }),
});

/** @param {HTMLElement} $container */
export function checkContainer($container) {
  if ($container == null)
    throw new Error(`${ERROR.PREFIX}: ${ERROR.CONTAINER.MISSING}`);
  if (!($container instanceof HTMLElement))
    throw new Error(`${ERROR.PREFIX}: ${ERROR.CONTAINER.NOT_HTML_ELEMENT}`);
  if (!$container.classList.contains("stepper-indicator"))
    throw new Error(`${ERROR.PREFIX}: ${ERROR.CONTAINER.MISSING}`);
}

export class StepperIndicator {
  /** @type {HTMLElement} */
  #$container;
  /** @type {HTMLSpanElement[]} */
  #$steps = [];
  /** @type {number} */
  #currentStep = STEP.DEFAULT;
  static CLASSES = CLASSES;

  /** @param {HTMLElement} $container */
  constructor($container, { dynamic = false } = {}) {
    checkContainer($container);

    this.#$container = $container;

    if (dynamic) return;

    const $steps = getAllElementsBySelector(
      `.${CLASSES.STEP}`,
      HTMLSpanElement,
      $container,
    );

    if ($steps.length < STEP.MIN)
      throw new Error(`${ERROR.PREFIX}: ${ERROR.STEP.MIN}`);

    this.#$steps = $steps;
  }

  #isLast() {
    return this.#currentStep === this.#$steps.length;
  }

  /** @param {number} quantity */
  generate(quantity) {
    const delta = this.#$steps.length - quantity;
    const absDelta = Math.abs(delta);

    if (absDelta < STEP.MIN) return;

    if (delta >= STEP.MIN) this.remove(delta);
    else this.add(absDelta);
  }

  add(quantity = 1) {
    for (let i = 0; i < quantity; i++) {
      const $step = document.createElement("span");

      $step.classList.add(CLASSES.STEP);
      this.#$container.appendChild($step);
      this.#$steps.push($step);
    }
  }

  remove(quantity = 1) {
    if (this.#$steps.length === STEP.MIN + 1)
      return console.warn(`${ERROR.PREFIX}: ${ERROR.STEP.ONLY_TWO}`);

    for (let i = 0; i < quantity; i++) {
      const $step = this.#$steps.pop();

      $step?.remove();
    }
  }

  goNext() {
    if (this.#isLast()) {
      console.warn(`${ERROR.PREFIX}: ${ERROR.STEP.NO_NEXT}`);
      return { isLast: true };
    }

    const stepIdx = this.#currentStep;
    const $step = this.#$steps[stepIdx];

    if ($step == null) {
      console.warn(`${ERROR.PREFIX}: ${ERROR.STEP.NO_NEXT}`);
      return { isLast: true };
    }

    $step.setAttribute(ATTRIBUTES.STEP.COMPLETED, "");
    this.#currentStep++;

    return { isLast: this.#isLast() };
  }

  reset({ selectFirst = false } = {}) {
    if (
      (!selectFirst && this.#currentStep === STEP.DEFAULT) ||
      (selectFirst && this.#currentStep === STEP.FIRST)
    )
      return;

    for (let i = 0; i < this.#currentStep; i++)
      this.#$steps[i].removeAttribute(ATTRIBUTES.STEP.COMPLETED);

    if (selectFirst) {
      this.#currentStep = STEP.FIRST;
      this.#$steps[0].setAttribute(ATTRIBUTES.STEP.COMPLETED, "");
    } else {
      this.#currentStep = STEP.DEFAULT;
    }
  }
}
