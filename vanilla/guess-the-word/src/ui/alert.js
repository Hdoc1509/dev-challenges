import { getElementById } from "@lib/dom";
import { Alert } from "@lib/alert/a11y";

const $alert = getElementById("alert", HTMLDivElement);

export const GameAlert = new Alert($alert);
