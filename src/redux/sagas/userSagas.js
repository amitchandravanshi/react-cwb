/*import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_USER,
  FETCH_USER_FAILED
} from "../constants/assignmentConstants";

import {
  receiveUserDetails,
  authenticatedUserErrorDetails
} from "../actions/assignmentActions";

function* authenticatedUserDetails() {
  try {
    const response = yield call(getAssignmentDetails);

    yield put(receiveAssignmentDetails(response.data));

  } catch (error) {
    yield put(fetchErrorAssignmentDetails(error));
  }
}

function* userSagas() {
  yield takeLatest(FETCH_ASSIGNMENT, fetchAssignmentDetails);
}

export default userSagas;*/