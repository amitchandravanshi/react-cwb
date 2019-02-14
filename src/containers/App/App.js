import React from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";
import "../../shared/scss/App.css";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CWBHeader from "../../components/Header/CWBHeader";
import Research from "../Research/ResearchContainer";
import Disclosure from "../../components/Tabs/Disclosure/Disclosure";
import ReviewSubmit from "../../components/Tabs/Review&Submit/ReviewSubmit";
import Write from "../../components/Tabs/Write/Write";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import DashBoard from "../DashBoard/DashBoardContainer";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FourOhFour = () => (
  <div className="container">
    <h1>404: Not Found</h1>
    <h3>
      <Link to="/">Go Home</Link>
    </h3>
  </div>
);
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  content: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});
const App = ({ router, classes }) => {
  return (
    <div className={"app-container " + classes.root}>
      <CWBHeader />
      <main className={"tab-container"}>
        <div className={classes.toolbar} />
        <ToastContainer autoClose={8000} />
        <Switch>
          <Route exact={true} path="/" component={DashBoard} />
          <Route exact path="/research" component={Research} />
          <Route exact path="/write" component={Write} />
          <Route exact path="/disclosures" component={Disclosure} />
          <Route path="/review" component={ReviewSubmit} />
          <Route exact path="/:postId" component={Research} />
          <Route path="*" component={FourOhFour} />
        </Switch>
        <Route path="/implicit/callback" component={ImplicitCallback} />
      </main>
    </div>
  );
};

export default withStyles(styles)(App);
