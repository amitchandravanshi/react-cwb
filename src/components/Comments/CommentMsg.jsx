import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from "@material-ui/core/styles";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";
const styles = theme => ({
  card: {
    margin: "1rem 0"
  },
  content: {
    padding: "3rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection: "column"
  }
});
const CommentMsg = props => {
  const { classes, msg } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.content}>
          <QuestionAnswer />
          <span>{msg}</span>
        </div>
      </CardContent>
    </Card>
  );
};
export default withStyles(styles)(CommentMsg);
