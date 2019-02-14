import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";

const styles = theme => {
  return {
    root: {
      padding: ".8rem",
      width: "80%"
    },
    header: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "baseline"
    },
    contentWrapper: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      flexWrap: "wrap"
    },
    contentHeader: {
      fontSize: "14px",
      fontWeight: "bold",
      width: "100%"
    },
    contentFooter: {
      fontSize: "12px",
      color: "#ccc"
    }
  };
};

class CommentHeader extends React.Component {
  get titleHeader() {
    const { classes, title, subheader } = this.props;
    return (
      <div className={classes.header}>
        <div className={classes.contentWrapper}>
          <span className={classes.contentHeader}>{title}</span>
          <span className={classes.contentFooter}>{subheader}</span>
        </div>
      </div>
    );
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.root}>{this.titleHeader}</div>;
  }
}

export default withStyles(styles)(CommentHeader);
