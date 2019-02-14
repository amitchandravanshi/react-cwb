import {
  FETCH_ASSIGNMENT,
  FETCH_ASSIGNMENT_SUCCEEDED,
  FETCH_ASSIGNMENT_FAILED
} from "../constants/assignmentConstants";

const initialState = {
  assignment: [],
  loading: false,
  error: false,
  postLoad: false,
  dashBoardLoaded: false
};

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSIGNMENT:
      return {
        ...state,
        assignment: [],
        loading: true,
        error: false,
        dashBoardLoaded: false
      };

    case FETCH_ASSIGNMENT_SUCCEEDED:
      return {
        ...state,
        assignment: action.payload,
        loading: false,
        error: false,
        dashBoardLoaded: false
      };
    case FETCH_ASSIGNMENT_FAILED:
      return {
        ...state,
        assignment: [],
        loading: false,
        error: true
      };
    /*case CREATE_ASSIGNMENT:
      return {
        ...state,
        assignment: [],
        loading: false,
        error: true
      };
    case CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        assignment: [],
        loading: false,
        error: true
      };
    case CREATE_ASSIGNMENT_FAILED:
      return {
        ...state,
        assignment: [],
        loading: false,
        error: true
      };*/
    default:
      return state;
  }
};

export default assignmentReducer;
