import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_ALL_ASSIGNMENT,
  FETCH_ALL_ASSIGNMENT_FAILED
} from "../constants/dashBoardConstants";

import {
  receiveAllAssignments,
  fetchErrorAllAssignments
} from "../actions/dashBoardActions";
import { getAllAssignmentForUser } from "../../api/dashBoardApi";

function* fetchAllAssignment(action) {
  try {
    const response = yield call(getAllAssignmentForUser, action.payload);

    yield put(receiveAllAssignments(response.data));
  } catch (error) {
    yield put(fetchErrorAllAssignments(error));
  }
}

function* dashBoardSagas() {
  yield takeLatest(FETCH_ALL_ASSIGNMENT, fetchAllAssignment);
}

export default dashBoardSagas;
