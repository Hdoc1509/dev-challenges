import { describe, expect, it, vi } from "vitest";
import { CountdownBar } from "./countdown-bar";

const createCountdownBar = ({ labeled = false } = {}) => {
  const $countdownBar = document.createElement("div");
  const $track = document.createElement("div");
  let $label;

  $countdownBar.classList.add("countdown-bar");
  $track.classList.add("countdown-bar__track");

  $countdownBar.append($track);

  if (labeled) {
    $label = document.createElement("span");

    $label.classList.add("countdown-bar__label", "visually-hidden");
    $label.setAttribute("role", "alert");
    $countdownBar.append($label);
  }

  return { $countdownBar, $track, $label };
};

describe("CountdownBar", () => {
  it("should be enabled with .start()  method", () => {
    // reference: https://stackoverflow.com/a/53390149
    const { $countdownBar, $track } = createCountdownBar();
    const TestCountdownBar = new CountdownBar($countdownBar);

    TestCountdownBar.start({ duration: 0, onEnd: () => {} });

    expect($track.hasAttribute("data-active")).toBe(true);
  });

  it("should call `onEnd` handler once countdown finishes", async () => {
    const { $countdownBar, $track } = createCountdownBar();
    const TestCountdownBar = new CountdownBar($countdownBar);
    const onEnd = vi.fn();

    TestCountdownBar.start({ duration: 0, onEnd });
    $track.dispatchEvent(new Event("animationend"));

    expect(onEnd).toHaveBeenCalledOnce();
  });
});
