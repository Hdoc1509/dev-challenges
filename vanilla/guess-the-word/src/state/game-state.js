import { IS_DEV } from "@/config";
import { GAME_STATE } from "@/consts";

/** @type {import("@/consts").GameState} */
export let gameSate = GAME_STATE.READY;

/** @param {import("@/consts").GameState} newGameState */
export const setGameState = (newGameState) => {
  gameSate = newGameState;
  if (IS_DEV) console.log({ gameSate });
};
