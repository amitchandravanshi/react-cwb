import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchAssignmentDetails,
  createAssignment
} from "../../redux/actions/assignmentActions";
import { fetchAllFieldsRequest } from "../../redux/actions/writeAction";
import { unHideTabs } from "../../redux/actions/dashBoardActions";
import AssignmentDetailsComponent from "../../components/Tabs/Research/AssignmentDetailsComponent";
import * as R from "ramda";

class AssignmentDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.createAssignmentDetails = this.createAssignmentDetails.bind(this);
  }
  componentDidMount() {
    if (!R.test(/research/, this.props.postId)) {
      this.props.fetchAssignmentDetails(this.props.postId);
    }
    this.props.unHideTabs();
  }

  componentDidUpdate() {
    if (!R.isEmpty(this.props.assignment) && this.props.userInitials) {
      this.createAssignmentDetails(this.props);
      this.props.fetchAllFieldsRequest(this.props.postId);
    }
  }

  createAssignmentDetails({ assignment, userInitials }) {
    let assignmentData = {
      percolateId: assignment.id,
      assignmentName: assignment.name,
      templateName: "web-template",
      userInitials: userInitials,
      workfrontJobId: assignment.metaData["Workfront job #"]
    };
    this.props.createAssignment(assignmentData);
  }

  render() {
    return <AssignmentDetailsComponent assignmentDetails={this.props} />;
  }
}

const mapStateToProps = ({ assignments, user }) => {
  return {
    loading: assignments.loading,
    assignment: assignments.assignment,
    error: assignments.error,
    userInitials: user.userId
  };
};

const mapDispatchToProps = dispatch => ({
  fetchAssignmentDetails: postId => dispatch(fetchAssignmentDetails(postId)),
  fetchAllFieldsRequest: postId => dispatch(fetchAllFieldsRequest(postId)),
  createAssignment: assignmentData =>
    dispatch(createAssignment(assignmentData)),
  unHideTabs: () => dispatch(unHideTabs())
});

AssignmentDetailsContainer.propTypes = {
  fetchAssignmentDetails: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignmentDetailsContainer);
