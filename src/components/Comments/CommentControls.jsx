import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";

const styles = theme => ({
  actions: {
    display: "flex"
  },
  avatar: {
    backgroundColor: red[500]
  },
  cardActionBtn: {
    height: `${theme.spacing * 3 + 4}px`,
    width: `${theme.spacing * 3 + 4}px`
  },
  cardActionIcon: {
    color: theme.palette.primary.pink
  }
});

const CommentControls = props => {
  const { classes } = props;
  return (
    <CardActions className={classes.actions} disableActionSpacing>
      <IconButton className={classes.cardActionBtn} />{" "}
    </CardActions>
  );
};

export default withStyles(styles)(CommentControls);
