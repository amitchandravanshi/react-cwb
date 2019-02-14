import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const AddLinkedin = props => {
  const onClick = () => {
    if (props.addPost) {
      props.addPost();
    }
  };
  const { classes } = props;
  return (
    <Grid>
      <Card className={"add-button"} onClick={onClick}>
        <span>Add Post</span>
      </Card>
    </Grid>
  );
};

export default AddLinkedin;
