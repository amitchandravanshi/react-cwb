import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
const styles = theme => {
  return {
    root: {
      background: "#fff",
      borderRadius: "4px",
      display: "flex",
      textAlign: "center",
      justifyContent: "space-around",
      padding: "0.5rem"
    },
    actions: {
      display: "flex"
    },
    buttonWrapper: {
      width: "12%"
    },
    contentWrapper: {
      width: "82%",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-end"
    },
    input: {
      width: "100%",
      borderRadius: "3px",
      border: "2px solid #ccc",
      overflow: "hidden",
      padding: ".4rem"
    },
    fabButton: {
      margin: theme.spacing.unit,
      color: "#424242",
      backgroundColor: "#add8e6",
      height: "32px",
      minWidth: "100%",
      width: "100%",
      overflow: "hidden",
      transition: "6s"
    }
  };
};

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commentText: ""
    };
  }
  onChange = e => {
    this.setState({
      commentText: e.target.value
    });
  };
  onKeyUp = e => {
    const { commentId, handleAddReply } = this.props;
    if (e.which === 13) {
      if (handleAddReply) {
        handleAddReply(this.state.commentText, commentId);
        this.setState({
          commentText: ""
        });
      } else {
        console.error("handleAddReply is not defined!");
      }
    }
  };
  submitComment = e => {
    const { commentId, handleAddReply } = this.props;
    if (handleAddReply) {
      handleAddReply(this.state.commentText, commentId);
      this.setState({
        commentText: ""
      });
    }
  };
  render() {
    const { classes, handleAddReply, inputProps, type, comment } = this.props;
    const { userInitials } = comment;
    return (
      <div className={classes.root}>
        <div className={classes.buttonWrapper}>
          <Button variant="fab" size="small" className={classes.fabButton}>
            {userInitials.substr(0, 2)}
          </Button>
        </div>
        <div className={classes.contentWrapper}>
          <TextField
            InputProps={{
              disableUnderline: true,
              ...inputProps
            }}
            type={type}
            placeholder="Leave a comment..."
            fullWidth
            multiline
            autoFocus
            value={this.state.commentText}
            onChange={this.onChange}
            // onKeyUp={this.onKeyUp}
            className={classes.input}
          />
          {this.state.commentText && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: "0.5rem" }}
              onClick={this.submitComment}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(CommentForm);
