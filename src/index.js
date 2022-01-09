import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Routes from "./Routes";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducers from "./Reducers";

let store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
