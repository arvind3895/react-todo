import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "antd/dist/antd.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import todo from "./reducers";

const saveStoreToLocal = (state) => {
  try {
    let data = state;
    const serialize = JSON.stringify(data);
    sessionStorage.setItem("store", serialize);
  } catch (e) {
    console.error(e);
  }
};

const store = createStore(todo);

store.subscribe(() => saveStoreToLocal(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
