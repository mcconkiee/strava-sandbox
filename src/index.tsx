import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import Routes from "./routes";
import Nav from './components/Nav/Nav';
import ModalMap from './containers/Modals/ModalMap';
import PrivateSession from './containers/Private/PrivateSession';
import "./index.css";
ReactDOM.render(
  <div className="uk-container">
    <Router>      
      <Provider store={store}>
        <Nav/>
        <div>
          <PrivateSession>
            <Routes />
          </PrivateSession>
        </div>
        <ModalMap/>    
      </Provider>
    </Router>    
  </div>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
