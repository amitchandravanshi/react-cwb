import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => {
  return {
    root: {
      width: "85%",
      paddingLeft: "1rem",
      fontFamily: "AvenirNextLT-Regular,AvenirNextLT-Demi"
    }
  };
};

const CommentTarget = props => {
  const { classes, targetText } = props;
  return <pre className={classes.root}>{targetText}</pre>;
};

export default withStyles(styles)(CommentTarget);
