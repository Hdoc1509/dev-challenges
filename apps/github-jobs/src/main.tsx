import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@material-design-icons/font";
import "@fontsource/roboto";
import "@fontsource-variable/montserrat"; // Supports weights 100-900
import "@fontsource/poppins";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
