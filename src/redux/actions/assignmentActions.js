import {
  FETCH_ASSIGNMENT,
  FETCH_ASSIGNMENT_SUCCEEDED,
  FETCH_ASSIGNMENT_FAILED,
  CREATE_ASSIGNMENT,
  CREATE_ASSIGNMENT_SUCCESS,
  CREATE_ASSIGNMENT_FAILED
} from "../constants/assignmentConstants";

/**
 * Method for fetching the assignment details from percolate
 */
export const fetchAssignmentDetails = postId => ({
  type: FETCH_ASSIGNMENT,
  payload: postId
});

/**
 * Function in case we get error while getting assignment details
 */
export const fetchErrorAssignmentDetails = error => ({
  type: FETCH_ASSIGNMENT_FAILED,
  payload: error
});

/**
 * Function for dispatching once the assignment details are received
 */
export const receiveAssignmentDetails = assignmentDetails => ({
  type: FETCH_ASSIGNMENT_SUCCEEDED,
  payload: assignmentDetails
});

/**
 * Method for creating the assignment details in CWB
 */
export const createAssignment = postData => ({
  type: CREATE_ASSIGNMENT,
  payload: postData
});

/**
 * Method for creating the assignment details in CWB
 */
export const receiveAssignmentSuccess = () => ({
  type: CREATE_ASSIGNMENT_SUCCESS,
  payload: ""
});

/**
 * Method for creating the assignment details in CWB
 */
export const receiveAssignmentFailure = () => ({
  type: CREATE_ASSIGNMENT_FAILED,
  payload: ""
});
