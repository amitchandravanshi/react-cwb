import {
  FETCH_ALL_ASSIGNMENT,
  FETCH_ALL_ASSIGNMENT_SUCCEEDED,
  FETCH_ALL_ASSIGNMENT_FAILED,
  ASSIGNMENT_DASHBOARD_LOADED,
  ASSIGNMENT_DASHBOARD_UNLOADED
} from "../constants/dashBoardConstants";

const initialState = {
  allAssignments: [],
  loading: false,
  error: false,
  dashBoardLoaded: true
};

const dashBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_ASSIGNMENT:
      return {
        ...state,
        allAssignments: [],
        loading: true,
        error: false
      };

    case FETCH_ALL_ASSIGNMENT_SUCCEEDED:
      return {
        ...state,
        allAssignments: action.payload,
        loading: false,
        error: false
      };
    case FETCH_ALL_ASSIGNMENT_FAILED:
      return {
        ...state,
        allAssignments: [],
        loading: false,
        error: true
      };
    case ASSIGNMENT_DASHBOARD_LOADED:
      return {
        ...state,
        dashBoardLoaded: true
      };
    case ASSIGNMENT_DASHBOARD_UNLOADED:
      return {
        ...state,
        dashBoardLoaded: false
      };
    default:
      return state;
  }
};

export default dashBoardReducer;
