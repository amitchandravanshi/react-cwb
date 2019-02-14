import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class AddBackupsItem extends React.Component {
  onClick = () => {
    if (this.props.onAddBackupClick) {
      this.props.onAddBackupClick();
    }
  };
  render() {
    return (
      <Grid item>
        <Card className={'add-button'} onClick={this.onClick}>
          <span>Add New Backup</span>
        </Card>
      </Grid>
    );
  }
}


export default (AddBackupsItem);
