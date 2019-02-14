import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SectionHeader from "../SectionHeader";
import AddFacebook from "./Facebook/AddFacebook";
import FacebookItem from "./Facebook/FacebookItem";
import _ from "lodash";
import * as social_action from "../../../../redux/actions/writeAction";
import { uploadSocialFileApi } from "../../../../api/writeApi";
const styles = theme => {
  return {
    root: {}
  };
};

const Facebook = props => {
  if (!props.Facebooks) return null;
  const handleDeleteItem = (id, name, status) => {
    props.socialMediaDeleteRequest({
      id,
      type: "facebook",
      name,
      key: "facebookId",
      status
    });
  };
  const saveInStore = payload => {
    props.updateFacebookRequest(payload);
  };
  const uploadFile = (facebookId, fileName, name, file, status) => {
    let assignmentId = props.store.write.assignment.percolateId;
    let userId = props.user.userId;
    uploadSocialFileApi({
      file,
      type: "facebook",
      assignmentId,
      userId,
      name,
      id: facebookId,
      status
    })
      .then(({ data }) => {
        props.showSuccessMsg("Successfully Uploaded");
        props.updateFacebookRequest({
          data,
          facebookId: facebookId,
          [fileName]: file.name
        });
      })
      .catch(error => {
        props.showErrorMsg("File Upload Failed");
      });
  };
  const onFileChange = (facebookId, fileName, name, file, count, status) => {
    if (!file) return;
    let facebook = props.Facebooks.filter(
      facebook => facebook.facebookId == facebookId
    )[0];
    if (facebook.name == file.name) {
      const isConfirm = window.confirm("Are you sure you want to override ?");
      if (isConfirm) {
        uploadFile(facebookId, fileName, name, file, status);
      }
    } else {
      uploadFile(facebookId, fileName, name, file, status);
    }
  };
  const addPost = () => {
    let newfacebook = props.Facebooks.filter(
      Facebook => Facebook.facebookId == ""
    )[0];
    if (newfacebook) {
      newfacebook = _.cloneDeep(newfacebook);
      newfacebook.facebookId = Math.floor(Math.random() * 20) + 1;
      newfacebook.status = "new";
      newfacebook.name = "";
      props.showSuccessMsg("New Post Added");
      props.addFacebookItemRequest({ newfacebook });
    }
  };
  return (
    <div className={"write-graphics-block content-block"}>
      <SectionHeader title="Facebook" id="Facebook" 
        tooltip="<b>Social Media Posts:</b>
        <ul>
          <li>Each article requires 3 tweets, 2  LinkedIn, 2 Facebook</li>
          <li>If you feel there may be interest on Facebook, please include a Facebook post as well.</li>
          <li>Please indicate what image you’ll be using with a screenshot – use the strongest imagery or charts/graphics within the article.</li>
        </ul>
        <b>Twitter:</b> Write with strong Call to Action (CTA) to optimize clicks to the site.<br />
        <b>LinkedIn:</b> Charts/infographics do really well on this channel<br />
        <b>Facebook:</b> Please write for more of an investor audience, with the objective of getting advisors to share." 
      />
      {props.Facebooks.filter(Facebook => Facebook.facebookId != "").map(
        (Facebook, index) => (
          <FacebookItem
            value={Facebook}
            key={Facebook.facebookId}
            count={index + 1}
            onFileChange={onFileChange}
            handleDeleteItem={handleDeleteItem}
            saveInStore={saveInStore}
          />
        )
      )}
      <AddFacebook addPost={addPost} />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    Facebooks: state.write.write.facebook,
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
  )(Facebook)
);
