import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MessageIcon from "@material-ui/icons/MessageSharp";
import BackupIcon from "@material-ui/icons/BackupSharp";
import Typography from "@material-ui/core/Typography";
import SlateEditor from "./SlateEditor/SlateEditor";
import FileField from "./FileField";
import UploadField from "./UploadField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const styles = theme => ({
  container: {},
  fieldContainer: {
    position: "relative"
  },
  fieldInputWrapper: {
    width: "95%",
    display: "flex"
  },
  charaterWrapper: {
    display: "flex",
    alignItems: "center",
    color: "#0a3039",
    width: "5%",
    justifyContent: "center"
  },
  slateFieldWrapper: {
    width: "98%",
    marginTop: "6px",
    display: "flex"
  },
  slateFieldWrapperDiv: {
    width: "92%"
  },
  fieldInput: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: "5px",
    minHeight: "30px",
    padding: "8px 12px"
  },
  fieldControlWrapper: {
    position: "absolute",
    right: "-10px",
    top: "57px"
  },
  iconButton1: {
    cursor: "pointer",
    position: "absolute",
    right: "-2px",
    top: "-23px",
    margin: "1px 0",
    color: theme.palette.primary.light
  },
  iconButton2: {
    cursor: "pointer",
    position: "absolute",
    right: "-2px",
    top: "-4px",
    margin: "4px 0",
    color: theme.palette.primary.light
  },
  slateEditorLabel: {
    fontSize: "18px",
    fontWeight: "300",
    top: "0px",
    color: "#17a2b8"
  }
});

class FormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      charaterCount: props.value ? props.value.length : 0
      //wordCount: props.value ? props.value.split(" ").length - 1 : 0
    };
  }
  onChange = (id, file) => {
    if (this.props.onFileChange) {
      this.props.onFileChange(id, file);
    }
  };

  onChangeHandler = event => {
    let value = event.target.value;
    this.setState({
      charaterCount: value.length
      // wordCount: value.split(" ").length - 1
    });
  };
  renderCharacterCount = () => {
    const { classes, maxLength } = this.props;
    if (maxLength == 0) {
      return null;
    } else {
      return (
        <Typography
          component="span"
          className={"character-count " + classes.charaterWrapper}
          style={this.state.charaterCount >= maxLength ? { color: "red" } : {}}
        >
          {this.state.charaterCount}/{maxLength}
        </Typography>
      );
    }
  };
  renderFields = () => {
    const {
      classes,
      placeholder = "Type Here",
      fieldType = "TextField",
      label = "Label",
      name,
      value,
      maxLength
    } = this.props;

    switch (fieldType) {
      case "MultiText":
        return (
          <Grid
            className={"form-input-multi-item " + classes.fieldInputWrapper}
          >
            <TextField
              className={"form-input"}
              label={label}
              multiline
              rows="4"
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.fieldInput
                }
              }}
              onBlur={this.props.onBlur}
              InputLabelProps={{
                shrink: true
              }}
              placeholder={placeholder}
              fullWidth
              name={name}
              margin="normal"
              defaultValue={value}
              inputProps={
                {
                  //maxLength: maxLength
                }
              }
              onChange={this.onChangeHandler}
            />
            {this.renderCharacterCount()}
          </Grid>
        );
      case "Editor":
        return (
          <Grid className={"form-input-editor " + classes.slateFieldWrapper}>
            <div className={"form-input " + classes.slateFieldWrapperDiv}>
              <InputLabel className={classes.slateEditorLabel}>
                {label}
              </InputLabel>
              <SlateEditor
                {...this.props}
                onBlur={this.props.onBlur}
                onChangeHandler={this.onChangeHandler}
              />
            </div>
            {this.renderCharacterCount()}
          </Grid>
        );
      case "CheckBox":
        return (
          <Grid className={classes.fieldInputWrapper}>
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  value={value}
                  checked={value}
                  onChange={this.props.handleChange}
                  color="primary"
                />
              }
              label={label}
            />
          </Grid>
        );
      default:
        return (
          <Grid className={"form-input-item " + classes.fieldInputWrapper}>
            <TextField
              label={label}
              className={"form-input"}
              InputProps={{
                disableUnderline: true,
                classes: {
                  input: classes.fieldInput
                }
              }}
              onBlur={this.props.onBlur}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={
                {
                  // maxLength: maxLength
                }
              }
              placeholder={placeholder}
              fullWidth
              name={name}
              margin="normal"
              defaultValue={value}
              onChange={this.onChangeHandler}
            />
            {this.renderCharacterCount()}
          </Grid>
        );
    }
  };
  onCommentBtnClick = () => {
    const { fieldName = "" } = this.props;
    if (this.props.onCommentBtnClick) {
      this.props.onCommentBtnClick(fieldName);
    }
  };
  render() {
    const {
      classes,
      allowComments = false,
      allowBackup = false,
      fieldType,
      label = "Label",
      value,
      name,
      id,
      imageName,
      fieldHelperText
    } = this.props;

    if (fieldType === "FileUpload") {
      return (
        <UploadField
          key={11}
          id={id}
          name={name}
          label={label}
          fileName={value}
          imageName={imageName}
          helperText={fieldHelperText}
          onFileChange={this.props.onFileChange}
        />
      );
    } else {
      return (
        <div className={classes.container}>
          <Grid item xs={12} className={classes.fieldContainer}>
            {this.renderFields()}
            <Grid item className={classes.fieldControlWrapper}>
              {allowComments ? (
                <MessageIcon
                  className={classes.iconButton1}
                  onClick={this.onCommentBtnClick}
                />
              ) : (
                ""
              )}
              {allowBackup ? (
                <BackupIcon className={classes.iconButton2} />
              ) : (
                ""
              )}
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

export default withStyles(styles)(FormField);
