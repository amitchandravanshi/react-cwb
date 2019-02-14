import { all, fork } from "redux-saga/effects";
import * as assignmentSagas from "./assignmentSagas";
import * as userSagas from "./userSagas";
import * as disclosureSagas from "./disclosureSagas";
import * as writeSagas from "./writeSagas";
import * as commentSagas from "./commentSaga";
import * as dashBoardSagas from "./dashBoardSagas";
import * as tagFilterSagas from "./tagFilterSagas";
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all(
    [
      ...Object.values(assignmentSagas),
      ...Object.values(userSagas),
      ...Object.values(disclosureSagas),
      ...Object.values(commentSagas),
      ...Object.values(writeSagas),
      ...Object.values(tagFilterSagas),
      ...Object.values(dashBoardSagas)
    ].map(fork)
  );
}
