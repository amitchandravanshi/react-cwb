import {
  FETCH_ALL_ASSIGNMENT,
  FETCH_ALL_ASSIGNMENT_SUCCEEDED,
  FETCH_ALL_ASSIGNMENT_FAILED,
  ASSIGNMENT_DASHBOARD_LOADED,
  ASSIGNMENT_DASHBOARD_UNLOADED
} from "../constants/dashBoardConstants";

/**
 * Method for fetching the assignment details from percolate
 */
export const fetchAllAssignments = emailId => ({
  type: FETCH_ALL_ASSIGNMENT,
  payload: emailId
});

/**
 * Function in case we get error while getting all assignment 
 */
export const fetchErrorAllAssignments = error => ({
  type: FETCH_ALL_ASSIGNMENT_FAILED,
  payload: error
});

/**
 * Function for dispatching once the all assignment are received
 */
export const receiveAllAssignments = assignmentDetails => ({
  type: FETCH_ALL_ASSIGNMENT_SUCCEEDED,
  payload: assignmentDetails
});

export const hideTabs = () => ({
  type: ASSIGNMENT_DASHBOARD_LOADED
});

export const unHideTabs = () => ({
  type: ASSIGNMENT_DASHBOARD_UNLOADED
});
