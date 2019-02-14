import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Grid from "@material-ui/core/Grid";

import FormField from "../../Form/FormField/FormField";

class CopyItem extends React.Component {
  constructor(props) {
    super(props);
    this.saveInStore = this.saveInStore.bind(this);
  }
  handleCommentModal = () => {
    const { onCommentBtnClick } = this.props;
    if (onCommentBtnClick) {
      onCommentBtnClick({ open: true });
    }
  };
  saveInStore(event) {
    this.props.saveInStore({ [event.target.name]: event.target.value });
  }
  handleBackupModal = () => {};
  renderForm = () => {

    const { fields = [] } = this.props.fieldProps;
    return fields.map((field, index) => {
      const { fieldName, properties, fieldId, fieldValue } = field;
      const { allowComments, ...restProps } = properties;
      return (
        <FormField
          key={index}
          label={fieldName}
          name={fieldId + ""}
          allowComments={allowComments}
          onCommentBtnClick={this.handleCommentModal}
          onBlur={this.saveInStore}
          value={fieldValue}
          {...restProps}
        />
      );
    });
  };
  render() {
    const { classes } = this.props;
    return <div className={"form-item"}>{this.renderForm()}</div>;
  }
}

export default CopyItem;
