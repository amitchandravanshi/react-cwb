import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import * as comment_action from "../../redux/actions/commentAction";
import CommentMsg from "./CommentMsg";
const styles = theme => {
  return {
    paper: {
      width: 300,
      display: "flex",
      flexDirection: "column",
      padding: "10px"
    }
  };
};

class CommentList extends React.Component {
  componentWillMount() {
    this.props.fetchCommentsRequest(this.props.postId);
  }
  postData = {
    commentValue: "",
    replyToId: "",
    userInitials: this.props.user.userId,
    percolateId: this.props.postId,
    commentStatus: ""
  };
  handleAddReply = (replyText, commentId) => {
    this.postData.commentValue = replyText;
    this.postData.replyToId = commentId;
    this.props.addCommentRequest(this.postData);
  };
  componentWillUnmount() {
    this.props.toggleComment(false);
  }
  childComment(comment) {
    const { comments } = this.props;
    return comments.comment.filter(data => data.replyToId == comment.commentId);
  }
  render() {
    const { classes, comments, targetText } = this.props;
    if (!comments.comment) return null;
    let comment = {
      updatedAt: "",
      commentId: "",
      userInitials: this.props.user.userId,
      commentStatus: "",
      createdAt: "",
      commentValue: "",
      replyToId: ""
    };
    return (
      <div>
        <CommentForm
          comment={comment}
          handleAddReply={this.handleAddReply}
          commentId=""
        />
        {!comments.comment.length && (
          <CommentMsg msg="No one has commented yet" />
        )}
        {comments.comment.length > 0 &&
          comments.comment
            .filter(comm => comm.replyToId == "")
            .sort(function(a, b) {
              return parseInt(b.commentId) - parseInt(a.commentId);
            })
            .map((comment, index) => {
              return (
                <CommentItem
                  key={index}
                  subComment={this.childComment(comment)}
                  comment={comment}
                  handleAddReply={this.handleAddReply}
                />
              );
            })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comment,
    postId: state.assignments.assignment.id,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(comment_action, dispatch)
  };
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList);
export default withStyles(styles)(ConnectedComponent);
