const MESSAGE_PREFIX = "StepperIndicator";

export class Messenger {
  #prefix: string;

  constructor(name?: string) {
    this.#prefix =
      name == null ? MESSAGE_PREFIX : `${MESSAGE_PREFIX} - ${name}`;
  }

  error(message: string) {
    throw new Error(`[${this.#prefix}]: ${message}`);
  }

  warn(message: string) {
    console.warn(`[${this.#prefix}]: ${message}`);
  }
}
