import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import registerServiceWorker from "./registerServiceWorker";
import createStore from "./redux/store/store";
import App from "./containers/App/App";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Security } from "@okta/okta-react";
import configDeterminator from "./configs/configDeterminator";
import { MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/default";
import "./shared/scss/App.css";
import "./shared/scss/site.css";
import "./shared/scss/header.css";

const { Store, history } = createStore();

ReactDOM.render(
  <Provider store={Store}>
    <MuiThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Security
          issuer={configDeterminator.issuer}
          client_id={configDeterminator.client_id}
          redirect_uri={configDeterminator.redirect_uri}
          scopes={configDeterminator.scopes}
          prompt="login"
        >
          <App />
        </Security>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// registerServiceWorker();
