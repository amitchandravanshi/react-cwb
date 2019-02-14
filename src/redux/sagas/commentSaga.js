import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_COMMENTS_REQUEST,
  ADD_COMMENT_REQUEST
} from "../constants/commentConstant";
import { getCommentAPI, postCommentAPI } from "../../api/commentApi";
import { fetchCommentsSuccess } from "../actions/commentAction";
import { showErrorMsg } from "../actions/writeAction";
function* fetchComment({ postId }) {
  try {
    const res = yield call(getCommentAPI, postId);
    yield put(fetchCommentsSuccess(res.data));
  } catch (e) {
    yield put(showErrorMsg("Unable to Fetch Comment"));
  }
}
function* addComment({ payload }) {
  try {
    const res = yield call(postCommentAPI, payload);
    yield call(fetchComment, { postId: payload.percolateId });
  } catch (error) {
    yield put(showErrorMsg("Unable to posts Comment"));
  }
}
function* commentSagas() {
  yield takeLatest(FETCH_COMMENTS_REQUEST, fetchComment);
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default commentSagas;
