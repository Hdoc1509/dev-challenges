import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@material-design-icons/font/filled.css";
import "@fontsource-variable/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";
import "@fontsource-variable/raleway";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/700.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
