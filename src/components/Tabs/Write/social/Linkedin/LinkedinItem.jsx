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

const LinkedinItem = props => {
  const { classes } = props;
  const saveInStore = event => {
    props.saveInStore({
      linkedinId: props.value.linkedinId,
      [event.target.name]: event.target.value
    });
  };
  const handleDeleteItem = () => {
    const { linkedinId, name, status } = props.value;
    let isConfirm = window.confirm("Are you sure you want to delete post!");
    if (isConfirm) {
      if (linkedinId) props.handleDeleteItem(linkedinId, name, status);
    } else {
      console.log("Ok, We will not delete");
    }
  };
  const onFileChange = (id, fieldName, file) => {
    const { linkedinId, name, status } = props.value;
    props.onFileChange(linkedinId, fieldName, name, file, props.count, status);
  };
  const renderForm = () => {
    const { fields = [] } = props.value;
    return fields.map((field, index) => {
      const { fieldName, properties, fieldId, fieldValue } = field;
      const { allowComments, ...restProps } = properties;
      return (
        <FormField
          key={"Linkedin" + index}
          label={fieldName}
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
          {`Linkedin #${props.count}`}
          <Button onClick={handleDeleteItem} className={classes.button}>
            Delete
          </Button>
        </Typography>
      </div>
      {renderForm()}
    </div>
  );
};

export default withStyles(styles)(LinkedinItem);
