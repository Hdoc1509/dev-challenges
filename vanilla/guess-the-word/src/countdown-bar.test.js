import { describe, expect, it, vi } from "vitest";
import { CountdownBar } from "./countdown-bar";

const createCountdownBar = ({ labeled = false } = {}) => {
  const $countdownBar = document.createElement("div");
  const $track = document.createElement("div");

  $countdownBar.classList.add("countdown-bar");
  $track.classList.add("countdown-bar__track");
  $countdownBar.append($track);

  if (labeled) {
    const $label = document.createElement("span");

    $label.classList.add("countdown-bar__label", "visually-hidden");
    $label.setAttribute("role", "alert");
    $countdownBar.append($label);
  }

  return { TestCountdownBar: new CountdownBar($countdownBar), $track };
};

describe("CountdownBar", () => {
  it("should be enabled with .start()  method", () => {
    // reference: https://stackoverflow.com/a/53390149
    const { TestCountdownBar, $track } = createCountdownBar();

    TestCountdownBar.start({ duration: 0, onEnd: () => {} });

    expect($track.hasAttribute("data-active")).toBe(true);
  });

  it("should be disabled with .disabled() method", () => {
    const { TestCountdownBar, $track } = createCountdownBar();

    TestCountdownBar.start({ duration: 0, onEnd: () => {} });
    TestCountdownBar.disable();

    expect($track.hasAttribute("data-active")).toBe(false);
  });

  // TODO: remove unused async
  it("should call `onEnd` handler once countdown finishes", async () => {
    const { TestCountdownBar, $track } = createCountdownBar();
    const onEnd = vi.fn();

    TestCountdownBar.start({ duration: 0, onEnd });
    $track.dispatchEvent(new Event("animationend"));

    expect(onEnd).toHaveBeenCalledOnce();
  });

  it.todo("should remove `onEnd` handler once used", () => {});

  it("should abort previous `onEnd` handler when calling .start() method", () => {
    const { TestCountdownBar, $track } = createCountdownBar();
    const firstOnEnd = vi.fn();
    const secondOnEnd = vi.fn();

    TestCountdownBar.start({ duration: 0, onEnd: firstOnEnd });
    TestCountdownBar.start({ duration: 0, onEnd: secondOnEnd });
    $track.dispatchEvent(new Event("animationend"));

    expect(firstOnEnd).not.toHaveBeenCalled();
    expect(secondOnEnd).toHaveBeenCalledOnce();
  });
});
