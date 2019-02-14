import React, { Component, Fragment } from "react";
import { withAuth } from "@okta/okta-react";
import TopBar from "./TopBar";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  authenticatedUserDetails,
  userErrorDetails,
  receiveUserDetails
} from "../../redux/actions/userActions";

class CWBHeader extends Component {
  constructor(props) {
    super(props);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.retrieveInitialFromName = this.retrieveInitialFromName.bind(this);
  }

  async getCurrentUser() {
    const userDetails = await this.props.auth.getUser().then(
      user => {
        this.retrieveInitialFromName(user);
      },
      error => {
        this.props.userErrorDetails(error);
      }
    );
  }

  componentDidMount() {
    setTimeout(() => this.getCurrentUser(), 3000);
  }

  retrieveInitialFromName(user) {
    if (null != user) {
      let firstNameInitial = user.given_name.charAt(0);
      let lastNameInitial = user.family_name.charAt(0);
      let userInitials = {
        initial: firstNameInitial + lastNameInitial,
        userId: user.preferred_username.split("@")[0]
      };

      this.props.receiveUserDetails(userInitials);
    }
  }

  render() {
    return (
      <Fragment>
        <TopBar user={this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, assignments, userAssignments }) => {
  return {
    user: user.user,
    error: user.error,
    assignment: assignments.assignment,
    loading: assignments.loading,
    dashBoardLoaded: userAssignments.dashBoardLoaded
  };
};

const mapDispatchToProps = dispatch => ({
  receiveUserDetails: user => dispatch(receiveUserDetails(user)),
  userErrorDetails: error => dispatch(userErrorDetails(error))
});

CWBHeader.propTypes = {
  userErrorDetails: PropTypes.func.isRequired,
  receiveUserDetails: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withAuth(CWBHeader)
);
