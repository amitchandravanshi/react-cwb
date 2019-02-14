import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import SectionHeader from "../SectionHeader";
import AddTwitter from "./Twitter/AddTwitter";
import TwitterItem from "./Twitter/TwitterItem";
import _ from "lodash";
import * as social_action from "../../../../redux/actions/writeAction";
import { uploadSocialFileApi } from "../../../../api/writeApi";
const styles = theme => {
  console.log(theme);
  return {
    root: {}
  };
};

const Twitter = props => {
  if (!props.twitters) return null;
  const handleDeleteItem = (id, name, status) => {
    props.socialMediaDeleteRequest({
      id,
      type: "twitter",
      name,
      key: "twitterId",
      status
    });
  };
  const saveInStore = payload => {
    props.updateTwitterRequest(payload);
  };
  const uploadFile = (twitterId, fileName, name, file, status) => {
    let assignmentId = props.store.write.assignment.percolateId;
    let userId = props.user.userId;
    uploadSocialFileApi({
      file,
      type: "twitter",
      assignmentId,
      userId,
      name,
      id: twitterId,
      status
    })
      .then(({ data }) => {
        props.showSuccessMsg("Successfully Uploaded");
        props.updateTwitterRequest({
          data,
          twitterId: twitterId,
          [fileName]: file.name
        });
      })
      .catch(error => {
        props.showErrorMsg("File Upload Failed");
      });
  };
  const onFileChange = (twitterId, fileName, name, file, count, status) => {
    if (!file) return;
    let twitter = props.twitters.filter(
      twitter => twitter.twitterId == twitterId
    )[0];

    if (twitter.name == file.name) {
      const isConfirm = window.confirm("Are you sure you want to override ?");
      if (isConfirm) {
        uploadFile(twitterId, fileName, name, file, status);
      }
    } else {
      uploadFile(twitterId, fileName, name, file, status);
    }
  };
  const addPost = () => {
    let newtwitter = props.twitters.filter(
      Twitter => Twitter.twitterId == ""
    )[0];
    if (newtwitter) {
      newtwitter = _.cloneDeep(newtwitter);
      newtwitter.twitterId = Math.floor(Math.random() * 20) + 1;
      newtwitter.status = "new";
      newtwitter.name = "";
      props.showSuccessMsg("New Post Added");
      props.addTwitterItemRequest({ newtwitter });
    }
  };
  return (
    <div className={"write-graphics-block content-block"}>
      <SectionHeader
        title="Twitter"
        id="twitter"
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
      {props.twitters
        .filter(twitter => twitter.twitterId != "")
        .map((twitter, index) => (
          <TwitterItem
            value={twitter}
            key={twitter.twitterId}
            count={index + 1}
            onFileChange={onFileChange}
            handleDeleteItem={handleDeleteItem}
            saveInStore={saveInStore}
          />
        ))}
      <AddTwitter addPost={addPost} />
    </div>
  );
};
const mapStateToProps = state => {
  return {
    twitters: state.write.write.twitter,
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
  )(Twitter)
);
