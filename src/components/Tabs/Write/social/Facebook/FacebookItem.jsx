import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { GridList, GridListTile, Typography, Button } from "@material-ui/core";
import FormField from "../../../../Form/FormField/FormField";
const styles = theme => {
  return {
    root: {}
  };
};

const FacebookItem = props => {
  const { classes } = props;
  const saveInStore = event => {
    props.saveInStore({
      facebookId: props.value.facebookId,
      [event.target.name]: event.target.value
    });
  };
  const handleDeleteItem = () => {
    const { facebookId, name, status } = props.value;
    let isConfirm = window.confirm("Are you sure you want to delete post!");
    if (isConfirm) {
      if (facebookId) props.handleDeleteItem(facebookId, name, status);
    } else {
      console.log("Ok, We will not delete");
    }
  };

  const onFileChange = (id, fieldName, file) => {
    const { facebookId, name, status } = props.value;
    props.onFileChange(facebookId, fieldName, name, file, props.count, status);
  };
  const renderForm = () => {
    const { fields = [] } = props.value;
    return fields.map((field, index) => {
      const { fieldName, properties, fieldId, fieldValue } = field;
      const { allowComments, ...restProps } = properties;
      return (
        <FormField
          label={fieldName}
          key={"Facebook" + index}
          name={fieldId + ""}
          allowComments={false}
          onBlur={saveInStore}
          value={fieldValue}
          onFileChange={onFileChange}
          {...restProps}
        />
      );
    });
  };
  return (
    <div>
      <div>
        <Typography
          variant="display1"
          component="span"
          gutterBottom
          className={"graphic-hdr"}
        >
          {`Facebook #${props.count}`}
          <Button onClick={handleDeleteItem} className={classes.button}>
            Delete
          </Button>
        </Typography>
      </div>
      {renderForm()}
    </div>
  );
};

export default withStyles(styles)(FacebookItem);
