import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import CommentTarget from "./CommentTarget";
import CommentHeader from "./CommentHeader";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const styles = theme => ({
  card: {
    width: "86%",
    background: "#f3f4f6",
    margin: "1rem 0"
  },
  wrapper: {
    display: "flex",
    width: "92%",
    flexDirection: "row",
    margin: "auto",
    flexWrap: "wrap"
  },
  cardContent: {
    padding: 0
  },
  spacing: {
    width: "12%"
  },
  button: {
    color: "#487dde",
    textTransform: "lowercase"
  },
  fabButton: {
    margin: theme.spacing.unit,
    color: "#424242",
    backgroundColor: "#add8e6",
    height: "32px",
    minWidth: "10%",
    width: "12%",
    overflow: "hidden"
  }
});

const ReplyItem = props => {
  const { classes, comment } = props;
  let {
    updatedAt,
    commentId,
    userInitials,
    commentStatus,
    createdAt,
    commentValue,
    replyToId
  } = comment;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.wrapper}>
          <Button variant="fab" size="small" className={classes.fabButton}>
            {userInitials.substr(0, 2)}
          </Button>
          <CommentHeader
            title={userInitials}
            subheader={moment(createdAt)
              .startOf("second")
              .fromNow()}
            styles={{ width: "80%" }}
          />
          <div className={classes.spacing} />
          <CommentTarget targetText={commentValue} />
          {/* <div className={classes.spacing} />
          <Button className={classes.button}>Delete</Button> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(ReplyItem);
