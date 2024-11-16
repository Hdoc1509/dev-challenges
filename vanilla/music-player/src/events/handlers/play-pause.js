import { $playPauseControl } from "@/controls.js";
import { $song } from "@/song.js";
import { PLAY_STATUS } from "@/consts";

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
