import { setupClickListeners } from "./click";
import { setupInputListeners } from "./input";
import { setupChangeListeners } from "./change";
import { setupCloseListeners } from "./close";

export function setupEventListeners() {
  setupClickListeners();
  setupInputListeners();
  setupChangeListeners();
  setupCloseListeners();
}
