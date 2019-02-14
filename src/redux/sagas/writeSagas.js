// import saga helper function
import { put, takeLatest, call } from "redux-saga/effects";

// import action constant
import {
  FETCH_ALL_FIELDS_REQUEST,
  FETCH_GRAPHICS_REQUEST,
  DELETE_GRAPHICS_ITEM_REQUEST,
  FILE_UPLOAD_REQUEST,
  FILE_UPLOAD_SUCCESS,
  FETCH_BACKUPS_REQUEST,
  ADD_BACKUPS_ITEM_REQUEST,
  DELETE_BACKUPS_ITEM_REQUEST,
  FETCH_COPY_REQUEST,
  UPDATE_COPY_REQUEST,
  UPLOAD_COPY_FORM_DATA,
  USER_LAST_LOGIN,
  CREATE_PROOF_REQUEST,
  CREATE_PROOF_VERSION_REQUEST,
  SOCIAL_DELETE_REQUEST
} from "../constants/writeConstants";

// import action
import {
  fetchAllFieldsSuccess,
  fetchAllFieldsFailure,
  fetchGraphicsSuccess,
  fetchGraphicsFailure,
  fetchBackupsFailure,
  fetchBackupsSuccess,
  fetchCopySuccess,
  fetchCopyFailure,
  addGraphicsSuccess,
  deleteGraphicsRequestSuccess,
  deleteGraphicsRequestFailed,
  deleteBackupsItemSuccess,
  showErrorMsg,
  showSuccessMsg,
  saveFormSuccess,
  createProofSuccess,
  socialMediaDeleteSuccess,
  receivePostSaveResponse
} from "../actions/writeAction";

// import api
import {
  getWrite,
  deleteGraphics,
  addGraphics,
  uploadFileApi,
  updateGraphics,
  addbackupApi,
  deleteBackups,
  updateBackupApi,
  saveWriteFormAPI,
  updateUserLastLogin,
  createProofApi,
  createProofVersionApi,
  deleteSocialPostAPI,
  createPersistproofAPI
} from "../../api/writeApi";

function* fetchWrite(action) {
  try {
    const response = yield call(getWrite, action.payload);
    yield put(fetchAllFieldsSuccess(response.data));
  } catch (error) {
    yield put(fetchAllFieldsFailure(error));
  }
}

// fetch copy

function* deleteGraphic({ payload }) {
  try {
    let graphic = payload.graphics.filter(
      item => item.graphicsId == payload.graphicId
    )[0];
    if (graphic.name) yield call(deleteGraphics, payload);
    yield put(deleteGraphicsRequestSuccess(payload));
    yield put(showSuccessMsg("Deleted Successfully"));
  } catch (error) {
    yield put(showErrorMsg("Error for deleting graphics"));
  }
}

function* addGraphic({ payload, dispatch }) {
  try {
    yield put(addGraphicsSuccess(payload));
  } catch (error) {
    yield put(fetchGraphicsFailure(error));
  }
}

function* deletebackup({ payload }) {
  try {
    let backup = payload.backups.filter(
      item => item.backupId == payload.backupId
    )[0];
    if (backup.name) yield call(deleteBackups, payload);

    yield put(deleteBackupsItemSuccess(payload));
    yield put(showSuccessMsg("Deleted Successfully"));
  } catch (error) {
    yield put(showErrorMsg("Error for deleting backup"));
  }
}
function* uploadCopyFormData({ payload }) {
  try {
    const response = yield call(saveWriteFormAPI, payload.formData);
    yield put(receivePostSaveResponse(response.data));
    if (payload.show) yield put(showSuccessMsg("Saved Successfully"));
    yield put(saveFormSuccess());
  } catch (error) {
    if (payload.show) yield put(showErrorMsg("Failed to Save the Content"));
  }
}
function* updateUserLoginStatus({ payload }) {
  try {
    yield call(updateUserLastLogin, payload);
  } catch (e) {
    console.error("update error", e);
  }
}

function* createProof({ payload }) {
  try {
    yield put(showSuccessMsg("Proof is being generated"));
    let res;
    if (!payload.proofList) {
      res = yield call(createProofApi, {
        assignmentId: payload.assignmentId,
        recipients: payload.recipients
      });
    } else {
      // console.log(payload.proofList, payload.proofList.length);
      let parentFileID = payload.proofList[payload.proofList.length - 1].fileId;
      res = yield call(createProofVersionApi, {
        assignmentId: payload.assignmentId,
        recipients: payload.recipients,
        parentFileID
      });
    }
    let proofUrl = payload.proofList
      ? payload.proofList.map(proof => proof.proofUrl + "|")
      : "";
    let fileId = res.data.fileId;
    proofUrl += res.data.proofUrl;

    yield call(createPersistproofAPI, {
      proofUrl,
      fileId,
      id: payload.assignmentId
    });
    yield put(createProofSuccess(res.data));
  } catch (e) {
    console.error(e);
    yield put(showErrorMsg("Error To send proof"));
  }
}

function* deleteSocialPost({ payload }) {
  try {
    if (payload && payload.status !== "new")
      yield call(deleteSocialPostAPI, payload.id);
    yield put(socialMediaDeleteSuccess(payload));
    yield put(showSuccessMsg("Delete successful"));
  } catch (e) {
    yield put(showErrorMsg("Unable to delete the post"));
  }
}

function* writeSagas() {
  yield takeLatest(FETCH_ALL_FIELDS_REQUEST, fetchWrite);
  yield takeLatest(DELETE_GRAPHICS_ITEM_REQUEST, deleteGraphic);
  yield takeLatest(DELETE_BACKUPS_ITEM_REQUEST, deletebackup);
  yield takeLatest(UPLOAD_COPY_FORM_DATA, uploadCopyFormData);
  yield takeLatest(USER_LAST_LOGIN, updateUserLoginStatus);
  yield takeLatest(CREATE_PROOF_REQUEST, createProof);
  yield takeLatest(SOCIAL_DELETE_REQUEST, deleteSocialPost);
}

export default writeSagas;
