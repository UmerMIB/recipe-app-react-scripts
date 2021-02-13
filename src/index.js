import React from "react";
import ReactDOM from "react-dom";
import App from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/index.scss";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
