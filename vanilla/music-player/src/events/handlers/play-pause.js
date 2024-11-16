import { $playPauseControl } from "@/controls.js";
import { $song } from "@/song.js";

const PLAY_STATUS = {
  PLAYING: "playing",
  IDLE: "idle",
  STOP: "stop",
};

export function handlePlayPause() {
  const currentStatus = $playPauseControl.dataset.status;

  if (currentStatus == null || currentStatus === PLAY_STATUS.STOP) {
    $playPauseControl.dataset.status = PLAY_STATUS.PLAYING;
    $song.play();
    return;
  }

  if (currentStatus === PLAY_STATUS.PLAYING) {
    $playPauseControl.dataset.status = PLAY_STATUS.STOP;
    $song.pause();
    return;
  }
}
