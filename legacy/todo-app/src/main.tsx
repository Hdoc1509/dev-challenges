import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@material-design-icons/font/filled.css";
import "@material-design-icons/font/outlined.css";
import "@fontsource-variable/montserrat";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource-variable/raleway";
import "@fontsource/raleway/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
