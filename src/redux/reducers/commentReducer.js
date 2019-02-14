import {
  FETCH_COMMENTS_SUCCESS,
  TOGGLE_COMMENT
} from "../constants/commentConstant";

let initialState = {
  isFetching: false
};
const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, comment: action.payload };
      break;
    case TOGGLE_COMMENT:
      return { ...state, commentToggle: action.payload };
    default:
      return state;
  }
};

export default commentReducer;