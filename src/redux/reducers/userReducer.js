import {
  FETCH_USER,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED
} from "../constants/userConstants";

const initialState = {
  user: [],
  authenticated: false,
  error: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: [],
        authenticated: false,
        error: false
      };

    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        user: action.payload.initial,
        userId: action.payload.userId,
        authenticated: true,
        error: false
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        user: [],
        authenticated: false,
        error: true
      };
    default:
      return state;
  }
};

export default userReducer;
