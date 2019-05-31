import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import "./index.css";
import Routes from "./routes";

ReactDOM.render(
  <div className="uk-container">
    <Router>
      <Provider store={store}>
        <div>
          <Routes />
        </div>
      </Provider>
    </Router>
  </div>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
