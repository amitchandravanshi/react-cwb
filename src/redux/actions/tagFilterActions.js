import {
  FETCH_TAG_FILTERS,
  ADD_TAG_FILTERS,
  DELETE_TAG_FILTERS,
  FETCH_TAG_FILTER_SUCCEEDED
} from "../constants/tagFilterConstants";

/**
 * Method for fetching the disclosure details from percolate
 */
export const fetchTagFiltersDetails = () => ({
    type: FETCH_TAG_FILTERS
});

/**
 * Function in case we get error while getting disclosure details
 */
export const addTagFilter = (tagDetails) => ({
    type: ADD_TAG_FILTERS,
    payload:tagDetails
}
    );

/**
 * Function for dispatching once the disclosure details are received
 */
export const deleteTagFilter = (tagDetails) => ({
    type: DELETE_TAG_FILTERS,
    payload:tagDetails
});

