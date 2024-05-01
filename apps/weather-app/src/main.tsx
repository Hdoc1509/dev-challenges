import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@material-design-icons/font/filled.css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
