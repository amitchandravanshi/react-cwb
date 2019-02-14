import React from "react";
import PropTypes from "prop-types";
import { withRouter, Route, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Tab from "./Tab";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";

const drawerWidth = 250;
const styles = theme => {
  return {
    root: {
      flexGrow: 1,
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex"
    },
    drawerPaper: {
      position: "fixed",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      backgroundColor: "#e5e5e5",
      overflow: "auto",
      height: "100%"
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    },
    toolbarTitle: {
      flex: 1,
      position: "relative"
    }
  };
};

class Tabs extends React.Component {
  constructor() {
    super();
    this.state = {
      activeTab: "Research",
      tabNames: [
        { name: "Assignments", path: "/", icon: "dashboard" },
        { name: "Research", path: "/research", icon: "search" },
        { name: "Write", path: "/write", icon: "create" },
        { name: "Add Disclosure", path: "/disclosures", icon: "how_to_reg" },
        { name: "Review and Submit", path: "/review", icon: "review" }
      ],
      open: true
    };
  }
  onTabClick = (activeTab, tabIndex) => {
    //this.props.saveTheForm();
    activeTab = activeTab == "Assignments" ? "Research" : activeTab;
    this.setState({
      activeTab
    });
  };
  renderTabs = () => {
    const { classes } = this.props;
    const { tabButton, tabLastButton, tabButtonActive } = classes;
    const { tabNames, activeTab } = this.state;
    return tabNames.map(({ name, path, icon }, index) => {
      return (
        <Tab
          key={index}
          label={name}
          to={path}
          icon={icon}
          activeTab={activeTab}
          onTabClick={() => this.onTabClick(name)}
        />
      );
    });
  };
  render() {
    const { classes, open } = this.props;
    return (
      <Drawer
        variant="persistent"
        // containerStyle={{ transform: "none" }}
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose,
            "drawerOpen_" + open,
            "drawer_block"
          )
        }}
        open={this.state.open}
      >
        <div className={classes.toolbar} />
        <List>{this.renderTabs()}</List>
      </Drawer>
    );
  }
}

const TabsWithRouter = withRouter(Tabs);

export default withStyles(styles)(TabsWithRouter);
