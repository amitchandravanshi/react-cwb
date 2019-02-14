import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_ASSIGNMENT,
  FETCH_ASSIGNMENT_FAILED,
  CREATE_ASSIGNMENT
} from "../constants/assignmentConstants";

import {
  receiveAssignmentDetails,
  fetchErrorAssignmentDetails,
  receiveAssignmentSuccess,
  receiveAssignmentError
} from "../actions/assignmentActions";
import {
  getAssignmentDetails,
  createAssignmentDetails
} from "../../api/assignmentApi";

function* fetchAssignmentDetails(action) {
  try {
    const response = yield call(getAssignmentDetails, action.payload);

    yield put(receiveAssignmentDetails(response.data));
  } catch (error) {
    yield put(fetchErrorAssignmentDetails(error));
  }
}

function* createAssignment(action) {
  try {
    const response = yield call(createAssignmentDetails, action.payload);

    yield put(receiveAssignmentSuccess(response.data));
  } catch (error) {
    yield put(receiveAssignmentSuccess(error));
  }
}

function* assignmentSagas() {
  yield takeLatest(FETCH_ASSIGNMENT, fetchAssignmentDetails);
  yield takeLatest(CREATE_ASSIGNMENT, createAssignment);
}

export default assignmentSagas;
