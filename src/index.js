import React from "react";
import ReactDOM from "react-dom";
import App from "./UI/App.js";
import { Provider } from "react-redux";
import store from "./UI/store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
