import {
  FETCH_DISCLOSURE,
  FETCH_DISCLOSURE_SUCCEEDED,
  FETCH_DISCLOSURE_FAILED,
  ADD_DISCLOSURE
} from "../constants/disclosureConstants";

/**
 * Method for fetching the disclosure details from percolate
 */
export const fetchDisclosureDetails = (param) => ({
    type: FETCH_DISCLOSURE,
    payload:param
});

/**
 * Function in case we get error while getting disclosure details
 */
export const fetchErrorDisclosureDetails = error => {};

/**
 * Function for dispatching once the disclosure details are received
 */
export const receiveDisclosureDetails = disclosureDetails => ({
    type: FETCH_DISCLOSURE_SUCCEEDED,
    payload: disclosureDetails
});
/**
 * Function for dispatching once the disclosure details
 */
export const addDisclosureDetails = (disclosureDetails) => ({
    type: ADD_DISCLOSURE,
    payload:disclosureDetails
});
