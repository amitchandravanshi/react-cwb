import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from "@material-ui/icons/Clear";
import AppBar from "@material-ui/core/AppBar";
const styles = theme => {
  return {
    root: {
      width: "33%",
      position: "fixed",
      top: 0,
      right: 0,
      paddingTop: "1rem",
      height: "100vh",
      overflowY: "scroll",
      transition: "500ms"
    },
    contentWrapper: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#00353c",
      width: "100%",
      padding: "1rem"
    },
    content: {
      width: "100%",
      marginTop: "3rem"
    },
    buttonWrapper: {
      display: "flex",
      backgroundColor: "#00353c",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    closeButton: {}
  };
};

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  formatSelection(e) {
    if (e.ctrlKey && e.which == 66) {
      setTimeout(() => document.execCommand("bold"), 1000);
      window.getSelection().empty();
    } else if (e.ctrlKey && e.which == 117) {
      setTimeout(() => document.execCommand("underline"), 1000);
      window.getSelection().empty();
    } else if (e.ctrlKey && e.which == 73) {
      setTimeout(() => document.execCommand("italic"), 1000);
      window.getSelection().empty();
    }
  }

  render() {
    const { open = false, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.contentWrapper}>
          <div className={classes.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Modal);
