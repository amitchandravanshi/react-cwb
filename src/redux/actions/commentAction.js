import {
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  TOGGLE_COMMENT,
  ADD_COMMENT_REQUEST
} from "../constants/commentConstant";
export const fetchCommentsRequest = postId => {
  return {
    type: FETCH_COMMENTS_REQUEST,
    isFetching: true,
    postId
  };
};

export const fetchCommentsSuccess = payload => {
  return {
    type: FETCH_COMMENTS_SUCCESS,
    payload
  };
};

export const fetchCommentsFailure = error => {
  return {
    type: FETCH_COMMENTS_FAILURE,
    error
  };
};

export const toggleComment = payload => ({
  type: TOGGLE_COMMENT,
  payload
});
export const addCommentRequest = payload => ({
  type: ADD_COMMENT_REQUEST,
  payload
});
