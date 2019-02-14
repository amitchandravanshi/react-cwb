import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import CommentHeader from "./CommentHeader";
import CommentTarget from "./CommentTarget";
import CommentForm from "./CommentForm";
import ReplyList from "./ReplyList";
import Button from "@material-ui/core/Button";
import moment from "moment";
import ReplyItem from "./ReplyItem";

const styles = theme => ({
  card: {
    width: "100%",
    margin: "15px 0"
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

class CommentItem extends React.Component {
  handleAddReply = (replyText, commentId) => {
    const { comments, comment } = this.props;
    const reply = {
      commentId,
      replyText
    };

    // this.props.addReply(comments, comment, reply);
  };
  render() {
    const { classes, comment, subComment } = this.props;

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
      <div>
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
              />
              <div className={classes.spacing} />
              <CommentTarget targetText={commentValue} />
              <div className={classes.spacing} />
              <ReplyList
                commentId={commentId}
                handleAddReply={this.props.handleAddReply}
              />
              {subComment
                .sort(function(a, b) {
                  return parseInt(b.commentId) - parseInt(a.commentId);
                })
                .map(sub => (
                <Fragment>
                  <div className={classes.spacing} />
                  <ReplyItem comment={sub} key={sub.commentId} />
                </Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ comments_reducer }) => {
  return { ...comments_reducer };
};

const mapDispatchToProps = dispatch => {
  return {
    // ...bindActionCreators(actions, dispatch)
  };
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem);
export default withStyles(styles)(ConnectedComponent);
