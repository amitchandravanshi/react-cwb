import React from "react";
import Popup from "reactjs-popup";
import "./../../assets/scss/modals.css";
import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const ShareWithOthers = props => (
  <Dialog
    open={true}
    onClose={props.handleClose}
    aria-labelledby="form-dialog-title"
  >
    <DialogTitle id="form-dialog-title">
      <div className={props.classes.dialogWrapper}>
        <span>Share</span>
        <span
          className={props.classes.dialogAction}
          onClick={props.handleClose}
        >
          x
        </span>
      </div>
    </DialogTitle>
    <DialogContent>
      <Card {...props} />
    </DialogContent>
  </Dialog>
);
const styles = theme => {
  return {
    dialogWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    dialogAction: {
      cursor: "pointer",
      fontSize: "1.5rem",
      color: "#17a2b8"
    },
    shortcodeGrid: {},
    box: {
      border: "1px solid #16a2b8",
      padding: "10px",
      borderRadius: "10px",
      width: "95%"
    },
    shortcodeWrapper: {
      display: "flex",
      flexDirection: "column"
    },
    shortcodeBox: {
      border: "1px dashed #000",
      padding: "5px",
      marginRight: "5px",
      borderRadius: "5px",
      width: "100%",
      background: "#fafafa"
    },
    button: {
      color: "#17a2b8"
    },
    margin: {
      margin: 0
    }
  };
};

const Card = ({ title, classes, postId }) => {
  function copyToClipboard() {
    document.querySelector("#shareUrl").select();
    document.execCommand("copy");
  }
  function shareURLByEmail() {
    document.location.href=`mailto:?subject=CWB link shared with you&body=${window.location.host}/${postId}`;
  }
  return (
    <div className="card">
      <div className={classes.shortcodeWrapper}>
        <span>Anyone with this link can view and edit.</span>
        <input
          defaultValue={`${window.location.host}/${postId}`}
          id="shareUrl"
          readOnly
          className={classes.shortcodeBox}
          // style={{ display: "none" }}
        />
        <Button className={classes.button} onClick={copyToClipboard}>
          Copy Link
        </Button>
        <Button className={classes.button} onClick={shareURLByEmail}>
          Email Link
        </Button>
      </div>
    </div>
  );
};

export default withStyles(styles)(ShareWithOthers);
