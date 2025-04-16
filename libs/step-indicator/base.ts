import { MESSAGE } from "./messages";
import { ATTRIBUTES, CLASSES, STEP } from "./consts";
import type { Messenger } from "./messenger";
import type { EventListener, ExpectedElements } from "./types";

type ExtraParams = {
  messenger: Messenger;
  onStep?: EventListener["onStep"];
  $steps: ExpectedElements["$steps"];
};

export class StepIndicatorBase {
  #$container: ExpectedElements["$container"];
  #messenger: Messenger;
  #current: number = STEP.DEFAULT;
  #onStep?: EventListener["onStep"];
  static CLASSES = CLASSES;

  constructor(
    $container: ExpectedElements["$container"],
    { messenger, $steps, onStep }: ExtraParams,
  ) {
    this.#$container = $container;
    this.#messenger = messenger;
    this.#onStep = onStep;

    const $initial = $container.querySelector(
      `:scope > .${CLASSES.STEP}[${ATTRIBUTES.STEP.INITIAL}]`,
    );

    if (!($initial instanceof HTMLSpanElement)) return;

    for (const $step of $steps) {
      $step.setAttribute(ATTRIBUTES.STEP.COMPLETED, "");
      this.#current++;

      if ($step === $initial) {
        $step.removeAttribute(ATTRIBUTES.STEP.INITIAL);
        break;
      }
    }

    onStep?.(this.#current);
  }
  get current() {
    // INFO: helps to update current step when removing steps
    const count = this.stepsCount;

    if (this.#current > count) {
      this.#current = count;
      this.#onStep?.(count);
    }

    return this.#current;
  }

  get stepsCount() {
    return this.#$container.childElementCount;
  }

  get hasCompletedSteps() {
    return this.#current === this.stepsCount;
  }

  #warn(message: string) {
    this.#messenger.warn(message);
  }

  goNext() {
    if (this.hasCompletedSteps) {
      this.#warn(MESSAGE.STEP.NO_NEXT);
      return { isLast: true };
    }

    const nexStepIdx = this.#current;
    const $nextStep = this.#$container.children[nexStepIdx];

    if ($nextStep == null) {
      this.#warn(MESSAGE.STEP.NO_NEXT);
      return { isLast: true };
    }

    $nextStep.setAttribute(ATTRIBUTES.STEP.COMPLETED, "");
    this.#current++;
    this.#onStep?.(this.#current);

    return { isLast: this.hasCompletedSteps };
  }

  reset({ selectFirst = false } = {}) {
    if (
      (selectFirst && this.#current === STEP.FIRST) ||
      (!selectFirst && this.#current === STEP.DEFAULT)
    )
      return;

    for (let i = 0; i < this.#current; i++)
      this.#$container.children[i].removeAttribute(ATTRIBUTES.STEP.COMPLETED);

    if (selectFirst) {
      this.#current = STEP.FIRST;
      this.#$container.children[0].setAttribute(ATTRIBUTES.STEP.COMPLETED, "");
    } else {
      this.#current = STEP.DEFAULT;
    }

    this.#onStep?.(this.#current);
  }
}
