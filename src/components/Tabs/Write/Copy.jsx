import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import SectionHeader from "./SectionHeader";
import CopyItem from "./CopyItem";
import { bindActionCreators } from "redux";
import * as copy_actions from "../../../redux/actions/writeAction";
import "./../../../assets/scss/write.css";

class Copy extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
    this.saveInStore = this.saveInStore.bind(this);
  }

  saveInStore(payload) {
    this.props.updateCopyRequest(payload);
  }
  handleCommentModal = ({ open }) => {
    this.setState({
      isModalOpen: open
    });
  };
  render() {
    let { classes, copy } = this.props;
    if (!copy || !copy.copy) return null;
    return (
      <div className={"write-copy-block content-block"}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <SectionHeader title="Article Copy" id="copy" />
            <div className={"write-copy-fields-box"}>
              <CopyItem
                fieldProps={copy.copy}
                onCommentBtnClick={this.handleCommentModal}
                saveInStore={this.saveInStore}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ write }) => {
  return {
    copy: write.write
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(copy_actions, dispatch)
  };
};
const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Copy);
export default ConnectedComponent;
