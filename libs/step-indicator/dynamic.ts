import { StepIndicatorBase } from "./base";
import { Messenger } from "./messenger";
import { validateContainer } from "./validate";
import { CLASSES, MESSAGE, STEP } from "./consts";
import type {
  EventListener,
  ExpectedElements,
  SharedExtraParams,
} from "./types";

type ExtraParams = {
  onQuantity?: EventListener["onQuantity"];
};

export class StepIndicatorDynamic extends StepIndicatorBase {
  #$container: ExpectedElements["$container"];
  #messenger: Messenger;
  #onQuantity?: EventListener["onQuantity"];

  constructor(
    container: ExpectedElements["$container"],
    { name, onQuantity, onStep }: SharedExtraParams & ExtraParams = {},
  ) {
    const messenger = new Messenger(name);

    validateContainer(container, messenger);

    const $steps: ExpectedElements["$steps"] = container.querySelectorAll(
      `:scope > span.${CLASSES.STEP}`,
    );

    super(container, { messenger, $steps, onStep });
    this.#$container = container;
    this.#messenger = messenger;
    this.#onQuantity = onQuantity;
  }

  #canRemove() {
    return this.stepsCount > STEP.MIN;
  }

  generate(quantity: number) {
    const stepsCount = this.stepsCount;
    const delta = stepsCount - quantity;
    const absDelta = Math.abs(delta);

    if (
      (delta >= STEP.DEFAULT && delta <= STEP.MIN && stepsCount === STEP.MIN) ||
      delta === STEP.DEFAULT
    )
      return { canGenerate: false };

    if (delta > STEP.DEFAULT) this.remove(delta);
    else this.add(absDelta);

    return {
      canRemove: this.#canRemove(),
      isLast: this.hasCompletedSteps,
      canGenerate: true,
    };
  }

  add(quantity = 1) {
    for (let i = 0; i < quantity; i++) {
      const $step = document.createElement("span");

      $step.classList.add(StepIndicatorBase.CLASSES.STEP);
      this.#$container.appendChild($step);
    }

    this.#onQuantity?.(this.stepsCount);

    return { canRemove: this.#canRemove(), canAdd: true };
  }

  remove(quantity = 1) {
    if (!this.#canRemove()) {
      this.#messenger.warn(MESSAGE.STEP.ONLY_TWO);
      return { canRemove: false, canGenerate: true };
    }

    for (let i = 0; i < quantity; i++)
      this.#$container.lastElementChild?.remove();

    this.#onQuantity?.(this.stepsCount);

    // INFO: triggers update of current step
    this.current;

    return {
      canRemove: this.#canRemove(),
      isLast: this.hasCompletedSteps,
      canGenerate: true,
    };
  }
}
