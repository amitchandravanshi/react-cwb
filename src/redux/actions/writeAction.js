import {
  FETCH_ALL_FIELDS_REQUEST,
  FETCH_ALL_FIELDS_SUCCESS,
  FETCH_ALL_FIELDS_FAILURE,
  FETCH_COPY_REQUEST,
  FETCH_COPY_SUCCESS,
  FETCH_COPY_FAILURE,
  ADD_COPY_REQUEST,
  ADD_COPY_SUCCESS,
  FETCH_GRAPHICS_REQUEST,
  FETCH_GRAPHICS_SUCCESS,
  DELETE_GRAPHICS_ITEM_REQUEST,
  ADD_GRAPHICS_ITEM_REQUEST,
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FETCH_BACKUPS_REQUEST,
  FETCH_BACKUPS_SUCCESS,
  FETCH_BACKUPS_FAILURE,
  FETCH_GRAPHICS_FAILURE,
  ADD_BACKUPS_ITEM_REQUEST,
  DELETE_BACKUPS_ITEM_REQUEST,
  UPDATE_GRAPHICS_ITEM_REQUEST,
  UPDATE_COPY_REQUEST,
  ADD_GRAPHICS_ITEM_SUCCESS,
  UPDATE_BACKUPS_ITEM_SUCCESS,
  UPLOAD_COPY_FORM_DATA,
  DELETE_GRAPHICS_ITEM_SUCCESS,
  DELETE_GRAPHICS_ITEM_FAILURE,
  DELETE_BACKUPS_ITEM_SUCCESS,
  UPLOAD_COPY_FORM_DATA_SUCCESS,
  USER_LAST_LOGIN,
  UPDATE_DISCLOSURE_TAGS_SUCCESS,
  CREATE_PROOF_REQUEST,
  CREATE_PROOF_SUCCESS,
  CREATE_PROOF_FAILURE,
  PROOF_ACTION,
  TWITTER_MEDIA_REQUEST,
  LINKEDIN_MEDIA_REQUEST,
  FACEBOOK_MEDIA_REQUEST,
  TWITTER_MEDIA_UPDATE_REQUEST,
  LINKEDIN_MEDIA_UPDATE_REQUEST,
  FACEBOOK_MEDIA_UPDATE_REQUEST,
  SOCIAL_DELETE_REQUEST,
  SOCIAL_DELETE_SUCCESS,
  SAVE_ASSIGNMENT_SUCCEEDED,
  CLEAR_WRITE_STORE
} from "../constants/writeConstants";
import { toast } from "react-toastify";
// write action
export const fetchAllFieldsRequest = postId => {
  return {
    type: FETCH_ALL_FIELDS_REQUEST,
    payload: postId
  };
};
export const showSuccessMsg = message => {
  toast.success(message);
  return {
    type: "SUCCESS"
  };
};
export const showErrorMsg = message => {
  toast.error(message);
  return {
    type: "ERROR"
  };
};

export const fetchAllFieldsSuccess = payload => {
  return {
    type: FETCH_ALL_FIELDS_SUCCESS,
    payload
  };
};

export const fetchAllFieldsFailure = payload => {
  return {
    type: FETCH_ALL_FIELDS_FAILURE,
    payload
  };
};

//   end write action
// copy action
export const fetchCopyRequest = () => {
  return {
    type: FETCH_COPY_REQUEST
  };
};

export const fetchCopySuccess = payload => {
  return {
    type: FETCH_COPY_SUCCESS,
    payload
  };
};

export const fetchCopyFailure = error => {
  return {
    type: FETCH_COPY_FAILURE,
    error
  };
};

export const addCopyRequest = () => {
  return {
    type: ADD_COPY_REQUEST
  };
};

export const addCopySuccess = () => {
  return {
    type: ADD_COPY_SUCCESS
  };
};

export const addCopyFailure = error => {
  return {
    type: ADD_COPY_SUCCESS,
    error
  };
};
export const updateCopyRequest = payload => {
  return {
    type: UPDATE_COPY_REQUEST,
    payload
  };
};
/**********************************Graphic Action********* */

// graphic fetch action
export const fetchGraphicsRequest = () => {
  return {
    type: FETCH_GRAPHICS_REQUEST
  };
};
export const fetchGraphicsSuccess = payload => {
  return {
    type: FETCH_GRAPHICS_SUCCESS,
    payload
  };
};
export const fetchGraphicsFailure = error => {
  return {
    type: FETCH_GRAPHICS_FAILURE,
    error
  };
};

// graphic delete action
export const deleteGraphicsRequest = graphicId => {
  return {
    type: DELETE_GRAPHICS_ITEM_REQUEST,
    payload: graphicId
  };
};

// graphic delete action
export const deleteGraphicsRequestSuccess = message => {
  return {
    type: DELETE_GRAPHICS_ITEM_SUCCESS,
    payload: message
  };
};

// graphic delete action
export const deleteGraphicsRequestFailed = message => {
  return {
    type: DELETE_GRAPHICS_ITEM_FAILURE,
    payload: message
  };
};

// add new graphic
export const addGraphicsRequest = payload => {
  return {
    type: ADD_GRAPHICS_ITEM_REQUEST,
    payload
  };
};

export const addGraphicsSuccess = payload => {
  return {
    type: ADD_GRAPHICS_ITEM_SUCCESS,
    payload
  };
};

export const updateGraphicRequest = payload => {
  return {
    type: UPDATE_GRAPHICS_ITEM_REQUEST,
    payload
  };
};

// upload file

export const uploadFileRequest = () => {
  return {
    type: FILE_UPLOAD_REQUEST
  };
};
export const uploadFileSuccess = payload => {
  return {
    type: FILE_UPLOAD_SUCCESS,
    payload
  };
};

// back up action
export const fetchBackupsRequest = () => {
  return {
    type: FETCH_BACKUPS_REQUEST
  };
};

export const fetchBackupsSuccess = backupFields => {
  return {
    type: FETCH_BACKUPS_SUCCESS,
    backupFields
  };
};

export const fetchBackupsFailure = error => {
  return {
    type: FETCH_BACKUPS_FAILURE,
    error
  };
};
export const addBackupsItemRequest = payload => {
  return {
    type: ADD_BACKUPS_ITEM_REQUEST,
    payload
  };
};
export const deleteBackupsItemSuccess = payload => {
  return {
    type: DELETE_BACKUPS_ITEM_SUCCESS,
    payload
  };
};

export const deleteBackupsItemRequest = payload => {
  return {
    type: DELETE_BACKUPS_ITEM_REQUEST,
    payload
  };
};
export const uploadBackupSuccess = payload => {
  return {
    type: UPDATE_BACKUPS_ITEM_SUCCESS,
    payload
  };
};
export const uploadCopyFormData = payload => {
  return {
    type: UPLOAD_COPY_FORM_DATA,
    payload
  };
};
export const saveFormSuccess = () => ({ type: UPLOAD_COPY_FORM_DATA_SUCCESS });
export const updateUserLoginStatus = payload => ({
  type: USER_LAST_LOGIN,
  payload
});
// Update disclosureTags for saving into database

export const updatedisclosureTags = tags => ({
  type: UPDATE_DISCLOSURE_TAGS_SUCCESS,
  payload: tags
});

//create proof action
export const createProofRequest = payload => ({
  type: CREATE_PROOF_REQUEST,
  payload
});
export const createProofSuccess = payload => ({
  type: CREATE_PROOF_SUCCESS,
  payload
});
export const createProofFailure = () => ({
  type: CREATE_PROOF_FAILURE
});
export const updateProofAction = payload => ({
  type: PROOF_ACTION,
  payload
});

//twitter

export const addTwitterItemRequest = payload => ({
  type: TWITTER_MEDIA_REQUEST,
  payload
});

//linkedin
export const addLinkedinItemRequest = payload => ({
  type: LINKEDIN_MEDIA_REQUEST,
  payload
});

//Facebook
export const addFacebookItemRequest = payload => ({
  type: FACEBOOK_MEDIA_REQUEST,
  payload
});

export const updateTwitterRequest = payload => ({
  type: TWITTER_MEDIA_UPDATE_REQUEST,
  payload
});

export const updateLinkedinRequest = payload => ({
  type: LINKEDIN_MEDIA_UPDATE_REQUEST,
  payload
});

export const updateFacebookRequest = payload => ({
  type: FACEBOOK_MEDIA_UPDATE_REQUEST,
  payload
});

export const socialMediaDeleteRequest = payload => ({
  type: SOCIAL_DELETE_REQUEST,
  payload
});
export const socialMediaDeleteSuccess = payload => ({
  type: SOCIAL_DELETE_SUCCESS,
  payload
});

export const receivePostSaveResponse = postDetails => ({
  type: SAVE_ASSIGNMENT_SUCCEEDED,
  payload: postDetails
});

export const clearWriteStore = () => ({
  type: CLEAR_WRITE_STORE
});
