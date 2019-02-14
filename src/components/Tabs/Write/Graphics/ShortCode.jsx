import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => {
  return {
    shortcodeGrid: {},
    box: {
      border: "1px solid #16a2b8",
      padding: "10px",
      borderRadius: "10px",
      width: "95%"
    },
    shortcodeWrapper: {
      display: "flex",
      flexDirection: "row"
    },
    shortcodeBox: {
      border: "1px dashed #000",
      padding: "5px",
      marginRight: "5px",
      borderRadius: "5px",
      width: "45%",
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

class ShortCode extends React.Component {
  copyToClipboard(code, id) {
    document.querySelector("#" + id).select();
    document.execCommand("copy");
  }

  render() {
    const { classes, count, imgId, imageName, shortCode } = this.props;
    return (
      <div className={"write-short-code-box " + classes.box}>
        <p className={classes.margin}>
          Places the graphics into your body using shortcode
        </p>
        <div className={classes.shortcodeWrapper}>
          <input
            defaultValue={shortCode ? shortCode : ""}
            id={"visible" + count}
            readOnly
            className={classes.shortcodeBox}
            // style={{ display: "none" }}
          />

          <Button
            className={classes.button}
            onClick={() =>
              this.copyToClipboard(
                `[Graphic #${count} SHORTCODE ${count}]`,
                "visible" + count
              )
            }
          >
            Copy Shortcode
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShortCode);
