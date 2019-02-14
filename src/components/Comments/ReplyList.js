import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ReplyItem from "./ReplyItem";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
const styles = theme => {
  return {
    root: {
      width: "85%"
    },
    button: {
      color: "#487dde",
      textTransform: "lowercase"
    },
    reply: {
      transition: " 0.5s",
      display: "flex",
      flexWrap: "wrap",
      padding: "1rem",
      border: "2px solid #ccc",
      justifyContent: "flex-end"
    },
    action: {
      transition: " 0.5s"
    }
  };
};

class ReplyList extends React.Component {
  state = {
    commentText: "",
    actionState: true
  };
  onChange = e => {
    this.setState({
      commentText: e.target.value
    });
  };
  toggleReply = status => {
    this.setState({ actionState: status });
  };
  handleAddReply = e => {
    const { handleAddReply, commentId } = this.props;
    if (handleAddReply) {
      this.setState({ actionState: true, commentText: "" });
      handleAddReply(this.state.commentText, commentId);
    }
  };
  render() {
    const { classes, commentId } = this.props;
    return (
      <div className={classes.root}>
        {this.state.actionState && (
          <div className={classes.action}>
            <Button
              className={classes.button}
              onClick={() => this.toggleReply(false)}
            >
              Reply
            </Button>
            {/* <Button className={classes.button}>Delete</Button> */}
          </div>
        )}
        {!this.state.actionState && (
          <div className={classes.reply}>
            <TextField
              InputProps={{
                disableUnderline: false
              }}
              placeholder="Reply to comment..."
              fullWidth
              autoFocus
              multiline
              value={this.state.commentText}
              onChange={this.onChange}
              className={classes.input}
            />
            <Button onClick={() => this.toggleReply(true)}>Cancel</Button>
            {this.state.commentText && (
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleAddReply}
              >
                Reply
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(styles)(ReplyList);
