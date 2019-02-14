import {
  FETCH_USER,
  FETCH_USER_SUCCEEDED,
  FETCH_USER_FAILED,
  SAVE_USER_DETAILS
} from "../constants/userConstants";

/**
 * Method for fetching the user details from percolate
 */
export const authenticatedUserDetails = () => ({
  type: FETCH_USER
});

/**
 * Function in case we get error while getting user details
 */
export const userErrorDetails = error => ({
  type: FETCH_USER_FAILED,
  payload: error
});

/**
 * Function for dispatching once the user details are received
 */
export const receiveUserDetails = userDetails => ({
  type: FETCH_USER_SUCCEEDED,
  payload: userDetails
});

/**
 * Function for save the user details
 */

export const saveUserDetailsToStore = emailId => ({
  type: SAVE_USER_DETAILS,
  payload: emailId
});
