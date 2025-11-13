import { setupTabs } from "./tabs.js";
import { setupConverter } from "./converter.js";
import { setupFlashcards } from "./flashcards.js";

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  setupConverter();
  setupFlashcards();
});
