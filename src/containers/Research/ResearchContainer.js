import React, { Component } from "react";
import AssignmentDetailsContainer from "../Assignment/AssignmentDetailsContainer";
import Resource from "../../components/Tabs/Research/ResourceComponent";
import configDeterminator from "../../configs/configDeterminator";
import { connect } from "react-redux";

class Research extends Component {
  render() {
    return (
      <div>
        <AssignmentDetailsContainer postId={this.props.location.pathname} />
        <Resource daaUrl={configDeterminator.daaUrl} />
      </div>
    );
  }
}

export default connect()(Research);
