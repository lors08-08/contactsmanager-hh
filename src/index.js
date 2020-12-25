import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import store from "../src/redux/index";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
