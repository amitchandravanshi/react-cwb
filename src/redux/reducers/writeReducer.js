import {
  FETCH_ALL_FIELDS_REQUEST,
  FETCH_ALL_FIELDS_SUCCESS,
  FETCH_ALL_FIELDS_FAILURE,
  FETCH_GRAPHICS_SUCCESS,
  FETCH_BACKUPS_SUCCESS,
  FETCH_COPY_SUCCESS,
  ADD_GRAPHICS_ITEM_REQUEST,
  UPDATE_COPY_REQUEST,
  ADD_GRAPHICS_ITEM_SUCCESS,
  UPDATE_GRAPHICS_ITEM_REQUEST,
  ADD_BACKUPS_ITEM_REQUEST,
  UPDATE_BACKUPS_ITEM_SUCCESS,
  DELETE_GRAPHICS_ITEM_SUCCESS,
  DELETE_GRAPHICS_ITEM_FAILURE,
  DELETE_BACKUPS_ITEM_SUCCESS,
  DELETE_BACKUPS_ITEM_REQUEST,
  FETCH_BACKUPS_FAILURE,
  UPLOAD_COPY_FORM_DATA_SUCCESS,
  UPDATE_DISCLOSURE_TAGS_SUCCESS,
  PROOF_ACTION,
  CREATE_PROOF_REQUEST,
  TWITTER_MEDIA_REQUEST,
  TWITTER_MEDIA_DELETE_SUCCESS,
  LINKEDIN_MEDIA_REQUEST,
  LINKEDIN_MEDIA_DELETE_SUCCESS,
  FACEBOOK_MEDIA_REQUEST,
  FACEBOOK_MEDIA_DELETE_SUCCESS,
  TWITTER_MEDIA_UPDATE_REQUEST,
  LINKEDIN_MEDIA_UPDATE_REQUEST,
  FACEBOOK_MEDIA_UPDATE_REQUEST,
  CREATE_PROOF_SUCCESS,
  SOCIAL_DELETE_SUCCESS,
  SAVE_ASSIGNMENT_SUCCEEDED,
  CLEAR_WRITE_STORE
} from "../constants/writeConstants";
import _ from "lodash";
import * as R from "ramda";
import Moment from "moment";

let initialState = {
  loading: false,
  write: {},
  error: false
};

const writeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_WRITE_STORE:
      return {};
    case FETCH_ALL_FIELDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        proofStatus: "",
        proofUrl: []
      };
    case FETCH_ALL_FIELDS_SUCCESS:
      let proofUrl = _.get(action, "payload.assignment.proofURL", "");
      //if (!_.isEmpty(proofUrl))
      if (proofUrl) {
        proofUrl = proofUrl.split("|");
        let proofFileId = _.get(action, "payload.assignment.proofFileId", null);
        proofUrl = proofUrl.map(proof => {
          return { proofUrl: proof, fileId: proofFileId };
        });
      }
      return {
        ...state,
        write: action.payload,
        proofUrl,
        loading: false,
        error: false
      };
    case FETCH_ALL_FIELDS_FAILURE:
      return {
        ...state,
        write: action.payload,
        loading: false,
        error: true
      };
    case FETCH_COPY_SUCCESS:
      return { ...state, copy: action.payload };
    case FETCH_GRAPHICS_SUCCESS:
      return { ...state, graphic: action.payload };
    case FETCH_BACKUPS_SUCCESS:
      return { ...state, backups: action.backupFields };
    case ADD_GRAPHICS_ITEM_REQUEST:
      state.write.graphics.push(action.payload);
      return state;
    case UPDATE_COPY_REQUEST:
      return updateCopyRequest(state, action);
    case UPDATE_GRAPHICS_ITEM_REQUEST:
      return updateGraphicRequest(state, action);
    case DELETE_GRAPHICS_ITEM_SUCCESS: {
      const newState = Object.assign({}, state);

      const graphics = newState.write.graphics.filter(
        graphic => graphic.graphicsId === action.payload.graphicId
      );
      const index = _.findIndex(newState.write.graphics, {
        graphicsId: action.payload.graphicId
      });

      newState.write.graphics.splice(index, 1);
      return newState;
    }
    case ADD_BACKUPS_ITEM_REQUEST:
      state.write.backups.push(action.payload.backup);
      return state;
    case TWITTER_MEDIA_REQUEST:
      state.write.twitter.push(action.payload.newtwitter);
      return { ...state };
    case LINKEDIN_MEDIA_REQUEST:
      state.write.linkedIn.push(action.payload.newlinkedin);
      return { ...state };
    case FACEBOOK_MEDIA_REQUEST:
      state.write.facebook.push(action.payload.newfacebook);
      return { ...state };
    case UPDATE_BACKUPS_ITEM_SUCCESS:
      return updateBackup(state, action);
    case DELETE_BACKUPS_ITEM_SUCCESS:
      return deleteBackup(state, action);
    case FETCH_BACKUPS_FAILURE:
      return { ...state, write_error: action.error };
    case UPLOAD_COPY_FORM_DATA_SUCCESS:
      return { ...state, saveTime: Moment().format("MM/DD/YY [@] h:mm a") };
    // Update disclosureTags for saving into database
    case UPDATE_DISCLOSURE_TAGS_SUCCESS:
      if (state.write.assignment) {
        state.write.assignment.disclosureTags = action.payload;
      }
      return { ...state };
    case PROOF_ACTION:
      return { ...state, proofStatus: action.payload.proofStatus };
    case CREATE_PROOF_REQUEST:
      return { ...state, proofStatus: "" };
    case TWITTER_MEDIA_UPDATE_REQUEST:
      return updateTwitter(state, action);
    case LINKEDIN_MEDIA_UPDATE_REQUEST:
      return updateLinkedin(state, action);
    case FACEBOOK_MEDIA_UPDATE_REQUEST:
      return updateFacebook(state, action);

    case CREATE_PROOF_SUCCESS:
      state.proofUrl && state.proofUrl.push(action.payload);
      return { ...state };
    case SOCIAL_DELETE_SUCCESS:
      return deleteSocialMedia(state, action);
    case SAVE_ASSIGNMENT_SUCCEEDED:
      return {
        ...state,
        write: action.payload
      };
    default:
      return state;
  }
};

export default writeReducer;

function updateCopyRequest(state, action) {
  const key = Object.keys(action.payload)[0];
  const index = _.findIndex(state.write.copy.fields, {
    fieldId: parseInt(key)
  });
  state.write.copy.fields[index].fieldValue = action.payload[key];
  return state;
}
function updateGraphicRequest(state, action) {
  let newState = _.cloneDeep(state);

  const key = Object.keys(action.payload)[0];
  _.remove(key, c => c == "graphicsId");
  _.remove(key, c => c == "data");
  const index = _.findIndex(newState.write.graphics, {
    graphicsId: action.payload.graphicsId
  });
  const itemIndex = _.findIndex(newState.write.graphics[index].fields, {
    fieldId: parseInt(key)
  });

  if (action.payload.data) {
    newState.write.graphics[index].graphicsId = action.payload.data.graphicId;
    newState.write.graphics[index].name = action.payload.data.graphicName;
    newState.write.graphics[index].fields[itemIndex].fieldValue =
      action.payload.data.graphicName;
  } else {
    newState.write.graphics[index].fields[itemIndex].fieldValue =
      action.payload[key];
  }
  return newState;
}
function updateBackup(state, action) {
  let newState = _.cloneDeep(state);
  const index = _.findIndex(newState.write.backups, {
    backupId: action.payload.backupId
  });
  newState.write.backups[index].name = action.payload.data.BackupName;
  newState.write.backups[index].backupId = action.payload.data.BackupId;
  return newState;
}
function deleteBackup(state, action) {
  let newState = _.cloneDeep(state);
  const index = _.findIndex(newState.write.backups, {
    backupId: action.payload.backupId
  });
  newState.write.backups.splice(index, 1);
  return newState;
}

function updateTwitter(state, action) {
  let newState = _.cloneDeep(state);
  const key = Object.keys(action.payload)[0];
  _.remove(key, c => c == "twitterId");
  _.remove(key, c => c == "data");
  const index = _.findIndex(newState.write.twitter, {
    twitterId: action.payload.twitterId
  });
  const itemIndex = _.findIndex(newState.write.twitter[index].fields, {
    fieldId: parseInt(key)
  });

  if (action.payload.data) {
    newState.write.twitter[index].twitterId = action.payload.data.socialMediaId;
    newState.write.twitter[index].status = null;
    newState.write.twitter[index].name = action.payload.data.socialMediaName;
    newState.write.twitter[index].fields[itemIndex].fieldValue =
      action.payload.data.socialMediaName;
  } else {
    newState.write.twitter[index].fields[itemIndex].fieldValue =
      action.payload[key];
  }
  return newState;
}
function updateLinkedin(state, action) {
  let newState = _.cloneDeep(state);
  const key = Object.keys(action.payload)[0];
  _.remove(key, c => c == "linkedinId");
  _.remove(key, c => c == "data");
  const index = _.findIndex(newState.write.linkedIn, {
    linkedinId: action.payload.linkedinId
  });
  const itemIndex = _.findIndex(newState.write.linkedIn[index].fields, {
    fieldId: parseInt(key)
  });

  if (action.payload.data) {
    newState.write.linkedIn[index].linkedinId =
      action.payload.data.socialMediaId;
    newState.write.linkedIn[index].status = null;
    newState.write.linkedIn[index].name = action.payload.data.socialMediaName;
    newState.write.linkedIn[index].fields[itemIndex].fieldValue =
      action.payload.data.socialMediaName;
  } else {
    newState.write.linkedIn[index].fields[itemIndex].fieldValue =
      action.payload[key];
  }
  return newState;
}

function updateFacebook(state, action) {
  let newState = _.cloneDeep(state);
  const key = Object.keys(action.payload)[0];
  _.remove(key, c => c == "facebookId");
  _.remove(key, c => c == "data");
  const index = _.findIndex(newState.write.facebook, {
    facebookId: action.payload.facebookId
  });
  const itemIndex = _.findIndex(newState.write.facebook[index].fields, {
    fieldId: parseInt(key)
  });

  if (action.payload.data) {
    newState.write.facebook[index].facebookId =
      action.payload.data.socialMediaId;
    newState.write.facebook[index].status = null;
    newState.write.facebook[index].name = action.payload.data.socialMediaName;
    newState.write.facebook[index].fields[itemIndex].fieldValue =
      action.payload.data.socialMediaName;
  } else {
    newState.write.facebook[index].fields[itemIndex].fieldValue =
      action.payload[key];
  }
  return newState;
}

function deleteSocialMedia(state, action) {
  const { payload } = action;
  let newState = _.cloneDeep(state);
  const index = _.findIndex(newState.write[payload.type], {
    [payload.key]: payload.id
  });
  newState.write[payload.type].splice(index, 1);
  return newState;
}
