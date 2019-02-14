import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SectionHeader from "../SectionHeader";
import AddLinkedin from "./Linkedin/AddLinkedin";
import LinkedinItem from "./Linkedin/LinkedinItem";
import _ from "lodash";
import * as social_action from "../../../../redux/actions/writeAction";
import { uploadSocialFileApi } from "../../../../api/writeApi";
const styles = theme => {
  return {
    root: {}
  };
};

const Linkedin = props => {
  if (!props.Linkedins) return null;
  const handleDeleteItem = (id, name, status) => {
    props.socialMediaDeleteRequest({
      id,
      type: "linkedIn",
      name,
      key: "linkedinId",
      status
    });
  };
  const saveInStore = payload => {
    props.updateLinkedinRequest(payload);
  };
  const uploadFile = (linkedinId, fileName, name, file, status) => {
    let assignmentId = props.store.write.assignment.percolateId;
    let userId = props.user.userId;
    uploadSocialFileApi({
      file,
      type: "linkedIn",
      assignmentId,
      userId,
      name,
      id: linkedinId,
      status
    })
      .then(({ data }) => {
        props.showSuccessMsg("Successfully Uploaded");
        props.updateLinkedinRequest({
          data,
          linkedinId: linkedinId,
          [fileName]: file.name
        });
      })
      .catch(error => {
        props.showErrorMsg("File Upload Failed");
      });
  };
  const onFileChange = (linkedinId, fileName, name, file, count, status) => {
    if (!file) return;
    let linkedin = props.Linkedins.filter(
      linkedin => linkedin.linkedinId == linkedinId
    )[0];
    if (linkedin.name == file.name) {
      const isConfirm = window.confirm("Are you sure you want to override ?");
      if (isConfirm) {
        uploadFile(linkedinId, fileName, name, file, status);
      }
    } else {
      uploadFile(linkedinId, fileName, name, file, status);
    }
  };

  const addPost = () => {
    let newlinkedin = props.Linkedins.filter(
      Linkedin => Linkedin.linkedinId == ""
    )[0];
    if (newlinkedin) {
      newlinkedin = _.cloneDeep(newlinkedin);
      newlinkedin.linkedinId = Math.floor(Math.random() * 20) + 1;
      newlinkedin.status = "new";
      newlinkedin.name = "";
      props.showSuccessMsg("New Post Added");
      props.addLinkedinItemRequest({ newlinkedin });
    }
  };
  return (
    <div className={"write-graphics-block content-block"}>
      <SectionHeader title="Linkedin" id="linkedIn" tooltip="<b>Social Media Posts:</b>
        <ul>
          <li>Each article requires 3 tweets, 2  LinkedIn, 2 Facebook</li>
          <li>If you feel there may be interest on Facebook, please include a Facebook post as well.</li>
          <li>Please indicate what image you’ll be using with a screenshot – use the strongest imagery or charts/graphics within the article.</li>
        </ul>
        <b>Twitter:</b> Write with strong Call to Action (CTA) to optimize clicks to the site.<br />
        <b>LinkedIn:</b> Charts/infographics do really well on this channel<br />
        <b>Facebook:</b> Please write for more of an investor audience, with the objective of getting advisors to share."  
      />

      {props.Linkedins.filter(linkedin => linkedin.linkedinId != "").map(
        (Linkedin, index) => (
          <LinkedinItem
            value={Linkedin}
            key={Linkedin.linkedinId}
            count={index + 1}
            onFileChange={onFileChange}
            handleDeleteItem={handleDeleteItem}
            saveInStore={saveInStore}
          />
        )
      )}
      <AddLinkedin addPost={addPost} />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    Linkedins: state.write.write.linkedIn,
    user: state.user,
    store: state.write
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(social_action, dispatch)
  };
};
export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Linkedin)
);
