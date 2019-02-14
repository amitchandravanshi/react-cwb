import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import FormField from "../../../Form/FormField/FormField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReactLoading from "react-loading";
import configDeterminator from "../../../../configs/configDeterminator";
const styles = theme => {
  return {
    grid: {
      display: "flex",
      flex: 1,
      alignItems: "center",
      margin: "10px"
    },
    blockquote: {
      borderLeft: "4px solid #cbd0d2",
      paddingLeft: "10px",
      color: "#17a2b8",
      fontWeight: "100"
    },
    uploadFile: {
      marginBottom: "20px"
    }
  };
};

class BackupsItem extends React.Component {
  state = {
    itemLoading: false
  };
  onFileChange = (backupId, fieldName, file) => {
    if (this.props.onFileChange) {
      this.setState({ itemLoading: true });
      this.props.onFileChange(backupId, this.props.fieldProps.name, file);
      //this.setState({itemLoading:false})
    }
  };
  handleDeleteBackupItem = () => {
    const { onDeleteClick, fieldProps } = this.props;
    const { backupId } = fieldProps;
    if (onDeleteClick) {
      onDeleteClick(backupId);
    }
  };
  componentWillReceiveProps(newProps) {
    let { loading } = newProps;
    if (!loading) {
      this.setState({ itemLoading: loading });
    }
  }

  renderBackupItem = () => {
    const { classes, fieldProps = [], id, loading } = this.props;
    const { name, description = "", backupId, links, properties } = fieldProps;
    const { ...restProps } = properties;

    return (
      <Card className={"write-backup-card"}>
        <CardHeader
          className={"write-backup-card-hdr"}
          title="Backup File"
          action={
            <div>
              <Button onClick={this.handleDeleteBackupItem} color="primary">
                Delete
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={`${
                  configDeterminator.cwbApiEndpoint
                }/backups/${backupId}`}
              >
                Download
              </Button>
            </div>
          }
        />
        <CardContent className={"write-backup-card-file"}>
          <div className={classes.uploadFile}>
            {loading && this.state.itemLoading ? (
              <ReactLoading type={"bubbles"} color={"#000000"} />
            ) : (
              <FormField
                id={backupId}
                label={"Browse"}
                onFileChange={this.onFileChange}
                allowComments={false}
                fieldType="FileUpload"
                value={name}
                {...restProps}
              />
            )}
          </div>
        </CardContent>
      </Card>
    );
  };
  render() {
    const { classes } = this.props;
    return (
      <Grid item className={"backup-card " + classes.grid}>
        {this.renderBackupItem()}
      </Grid>
    );
  }
}

export default withStyles(styles)(BackupsItem);
