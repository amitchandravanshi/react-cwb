import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class AddGraphicsItem extends React.Component {
  onClick = () => {
    if (this.props.onAddGraphicClick) {
      this.props.onAddGraphicClick();
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid>
        <Card className={'add-button'} onClick={this.onClick}>
          <span>Add New Graphic</span>
        </Card>
      </Grid>
    );
  }
}

export default (AddGraphicsItem);
