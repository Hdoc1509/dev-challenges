import { IS_DEV } from "@/config";
import { GAME_STATE } from "@/consts";

/** @type {import("@/consts").GameState} */
export let gameState = GAME_STATE.READY;

/** @param {import("@/consts").GameState} newGameState */
export const setGameState = (newGameState) => {
  gameState = newGameState;
  if (IS_DEV) console.log({ gameSate: gameState });
};
