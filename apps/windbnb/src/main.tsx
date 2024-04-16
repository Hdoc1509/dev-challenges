import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@material-design-icons/font/filled.css";
import "@material-design-icons/font/round.css";
import "@fontsource-variable/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource-variable/mulish";
import "@fontsource/mulish/400.css";
import "@fontsource/mulish/700.css";
import "@fontsource/mulish/800.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
