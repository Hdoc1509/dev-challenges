import { describe, expect, it, vi } from "vitest";
import { getByRole } from "@testing-library/dom";
import { CountdownBar } from "./countdown-bar";

/** @param {{ onAlert?: (duration: number) => string, labeled?: boolean }} options */
const createCountdownBar = ({ labeled = false, onAlert } = {}) => {
  const $countdownBar = document.createElement("div");
  const $track = document.createElement("div");

  $countdownBar.classList.add("countdown-bar");
  $track.classList.add("countdown-bar__track");
  $countdownBar.append($track);

  if (labeled) {
    const $label = document.createElement("span");

    $label.classList.add("countdown-bar__alert", "visually-hidden");
    $label.setAttribute("role", "alert");
    $countdownBar.append($label);
  }

  return {
    TestCountdownBar: new CountdownBar($countdownBar, { onAlert }),
    $countdownBar,
    $track,
  };
};

describe("CountdownBar", () => {
  it("should be enabled with .start()  method", () => {
    // reference: https://stackoverflow.com/a/53390149
    const { TestCountdownBar, $track } = createCountdownBar();

    TestCountdownBar.start({ duration: 0, onTimesUp: () => {} });

    expect($track.hasAttribute("data-active")).toBe(true);
  });

  it("should be disabled with .disabled() method", () => {
    const { TestCountdownBar, $track } = createCountdownBar();

    TestCountdownBar.start({ duration: 0, onTimesUp: () => {} });
    TestCountdownBar.disable();

    expect($track.hasAttribute("data-active")).toBe(false);
  });

  it("calls `onTimesUp` handler once countdown finishes", () => {
    const { TestCountdownBar, $track } = createCountdownBar();
    const onTimesUp = vi.fn();

    TestCountdownBar.start({ duration: 0, onTimesUp });
    $track.dispatchEvent(new Event("animationend"));

    expect(onTimesUp).toHaveBeenCalledOnce();
  });

  it("removes `onTimesUp` handler once used", () => {
    const { TestCountdownBar, $track } = createCountdownBar();
    const onTimesUp = vi.fn();

    TestCountdownBar.start({ duration: 0, onTimesUp });
    $track.dispatchEvent(new Event("animationend"));
    $track.dispatchEvent(new Event("animationend"));

    expect(onTimesUp).toHaveBeenCalledOnce();
  });

  it("aborts previous `onTimesUp` handler when calling .start() method", () => {
    const { TestCountdownBar, $track } = createCountdownBar();
    const firstOnTimesUp = vi.fn();
    const secondOnTimesUp = vi.fn();

    TestCountdownBar.start({ duration: 0, onTimesUp: firstOnTimesUp });
    TestCountdownBar.start({ duration: 0, onTimesUp: secondOnTimesUp });
    $track.dispatchEvent(new Event("animationend"));

    expect(firstOnTimesUp).not.toHaveBeenCalled();
    expect(secondOnTimesUp).toHaveBeenCalledOnce();
  });

  it("does not notify an `alert` when `onAlert` is not provided", () => {
    const { TestCountdownBar, $countdownBar } = createCountdownBar({
      labeled: true,
    });
    const $label = getByRole($countdownBar, "alert");

    TestCountdownBar.start({ duration: 0, onTimesUp: () => {} });

    expect($label.textContent).toBe("");
  });

  it("notifies an `alert` when `onAlert` is provided", () => {
    const { TestCountdownBar, $countdownBar } = createCountdownBar({
      labeled: true,
      onAlert: (duration) => `${duration} seconds available`,
    });
    const $label = getByRole($countdownBar, "alert");
    const duration = 3;

    TestCountdownBar.start({ duration, onTimesUp: () => {} });
    expect($label.textContent).toBe(`${duration} seconds available`);
  });
});
