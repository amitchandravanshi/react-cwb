import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const styles = theme => {
  return {
    graphicGrid: {
      display: "flex",
      alignItems: "flex-end"
    },
    graphicItem: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      border: "1px solid #16a2b8",
      alignItems: "center",
      borderRadius: "10px",
      marginTop: "1px",
      width: "100%"
    },
    graphicLabel: {
      color: "#FFF",
      backgroundColor: "#b0b0b0",
      padding: "20px",
      borderRadius: "10px"
    },
    hiddenFile: {
      display: "none"
    },
    helper: {
      width: "100%",
      marginTop: "20px",
      fontSize: "16px",
      fontFamily: "AvenirNextLT-Demi",
      color: "#0a3039 !important"
    }
  };
};

class UploadField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }
  onChange = e => {
    const { id, onFileChange, name } = this.props;
    this.setState({ file: e.target.files[0] }, () => {
      if (onFileChange) {
        onFileChange(id, name, this.state.file);
      } else {
        console.log("onFileChange is not defined");
      }
    });
  };
  handleFileClick = () => {
    this.fileInput.click();
  };
  render() {
    const { classes, label = "", fileName, imageName, helperText } = this.props;
    return (
      <Grid
        item
        xs={12}
        className={classes.graphicGrid}
        style={{ flexDirection: "column" }}
      >
        <Typography component="h3" className={classes.helper}>
          {helperText}
        </Typography>
        <div className={"write-upload-box " + classes.graphicItem}>
          <input
            ref={input => (this.fileInput = input)}
            className={classes.hiddenFile}
            type="file"
            onChange={this.onChange}
          />
          <Button
            onClick={this.handleFileClick}
            className={classes.graphicLabel}
          >
            {label}
          </Button>
          <div className={"write-upload-file-name"}>
            {fileName ? fileName : imageName ? imageName : "Add File"}
          </div>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(UploadField);
