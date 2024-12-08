import { getMockedRandomQuote } from "./services/quotes";
import "@fontsource-variable/outfit";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/600.css";
import "./styles/main.css";

document.addEventListener("DOMContentLoaded", () => {
  console.log("app initialized");
  getMockedRandomQuote().then(console.log);
});
