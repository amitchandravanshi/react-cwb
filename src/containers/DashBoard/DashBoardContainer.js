import React, { Component } from "react";
import DashBoard from "../../components/DashBoard/DashBoardComponent";
import configDeterminator from "../../configs/configDeterminator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllAssignments } from "../../redux/actions/dashBoardActions";
import { saveUserDetailsToStore } from "../../redux/actions/userActions";
import DashBoardComponent from "../../components/DashBoard/DashBoardComponent";
import * as R from "ramda";
import { withAuth } from "@okta/okta-react";
import get from "lodash/get";
import { hideTabs } from "../../redux/actions/dashBoardActions";

import {
  fetchAllFieldsSuccess,
  updateUserLoginStatus,
  clearWriteStore
} from "../../redux/actions/writeAction";
class DashBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.saveUserDetails = this.fetchAllAssignments.bind(this);
  }

  async getCurrentUser() {
    await this.props.auth.getUser().then(
      user => {
        this.fetchAllAssignments(user);
        // this.props.updateUserLoginStatus({
        //   email: user.email,
        //   firstName: user.given_name,
        //   lastName: user.family_name,
        //   userInitials: user.preferred_username.split("@")[0]
        // });
      },
      error => {
        this.props.saveUserErrorDetails(error);
      }
    );
  }

  componentDidMount() {
    this.getCurrentUser();
    this.props.clearWriteStore();
  }

  fetchAllAssignments(user) {
    // if (null != user) {
    let emailId = get(user, "email", "");
    this.props.fetchAllAssignments(emailId);
    // this.props.hideTabs();
    // }
  }

  render() {
    return (
      <div>
        <DashBoard assignments={this.props} />{" "}
      </div>
    );
  }
}

const mapStateToProps = ({ userAssignments, user }) => {
  return {
    loading: userAssignments.loading,
    allAssignments: userAssignments.allAssignments,
    error: userAssignments.error,
    userDetails: user
  };
};

const mapDispatchToProps = dispatch => ({
  saveUserDetailsToStore: emailId => dispatch(saveUserDetailsToStore(emailId)),
  fetchAllAssignments: emailId => dispatch(fetchAllAssignments(emailId)),
  hideTabs: () => dispatch(hideTabs()),
  updateUserLoginStatus: user => dispatch(updateUserLoginStatus(user)),
  clearWriteStore: () => dispatch(clearWriteStore())
});

DashBoardContainer.propTypes = {
  saveUserDetailsToStore: PropTypes.func.isRequired,
  fetchAllAssignments: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuth(DashBoardContainer));
