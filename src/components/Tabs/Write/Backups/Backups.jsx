import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BackupsItem from "./BackupsItem";
import SectionHeader from "../SectionHeader";
import AddBackupsItem from "./AddBackupsItem";
import { uploadFileApi } from "../../../../api/writeApi";
import _ from "lodash";
import * as backups_actions from "../../../../redux/actions/writeAction";
// import * as fileupload_actions from '../../../actions/fileupload_actions';

class Backups extends React.Component {
  state = {
    loading: false
  };
  handleAddNewBackup = () => {
    const { backups } = this.props;
    let backup = backups[0];
    if (backup) {
      backup = _.cloneDeep(backup);
      backup.backupId = Math.floor(Math.random() * 20);
      backup.name = "";
      this.props.showSuccessMsg("New Backup Added");
      this.props.addBackupsItemRequest({ backup });
    }
  };
  onFileChange = (backupId, name, file) => {
    let assignmentId = this.props.store.assignments.assignment.id;
    let userId = this.props.store.user.userId;
    this.setState({ loading: true });
    uploadFileApi({
      file,
      url: "/backups",
      assignmentId,
      userId,
      name,
      id: backupId
    })
      .then(({ data }) => {
        this.setState({ loading: false });
        this.props.showSuccessMsg("Successfully Uploaded");
        this.props.uploadBackupSuccess({ data, backupId });
      })
      .catch(error => {
        this.setState({ loading: false });
        this.props.showErrorMsg("File Upload Fail");
      });
  };
  handleDeleteBackupItem = backupId => {
    let isConfirm = window.confirm("Are you sure you want to delete!");
    if (isConfirm) {
      const { backups } = this.props;
      this.props.deleteBackupsItemRequest({ backupId, backups });
    } else {
      console.log("Ok, We will not delete");
    }
  };
  renderItems = () => {
    const { backups } = this.props;
    if (!backups) {
      return;
    }
    return backups
      .filter(backup => backup.backupId != "")
      .map((backupItem, index) => {
        const backupField = backupItem;
        return (
          <BackupsItem
            loading={this.state.loading}
            key={index}
            id={backupItem.backupId}
            fileName={backupItem.Name}
            fieldProps={backupField}
            onFileChange={this.onFileChange}
            onDeleteClick={this.handleDeleteBackupItem}
          />
        );
      });
  };
  render() {
    return (
      <div className={"write-backups-block content-block"}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <SectionHeader title="Backups" id="backup" />
            <div className={"write-backups-items"}>
              {this.renderItems()}
              <AddBackupsItem onAddBackupClick={this.handleAddNewBackup} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    store: state,
    backups: state.write.write.backups
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(backups_actions, dispatch)
  };
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Backups);

export default ConnectedComponent;
