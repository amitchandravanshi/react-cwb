import axios from 'axios';
import { baseUrl } from '../config';

export const FETCH_ALL_FIELDS_REQUEST = 'FETCH_ALL_FIELDS_REQUEST';
export const FETCH_ALL_FIELDS_SUCCESS = 'FETCH_ALL_FIELDS_SUCCESS';
export const FETCH_ALL_FIELDS_FAILURE = 'FETCH_ALL_FIELDS_FAILURE';

export const fetchAllFieldsRequest = () => {
  return {
    type: FETCH_ALL_FIELDS_REQUEST
  }
}

export const fetchAllFieldsSuccess = () => {
  return {
    type: FETCH_ALL_FIELDS_SUCCESS
  }
}

export const fetchAllFieldsFailure = () => {
  return {
    type: FETCH_ALL_FIELDS_FAILURE
  }
}

const pushFieldsToLocalStorage = (allFields, dispatch) => {
  const { copy, graphics, backups } = allFields.fields;
  localStorage.setItem('copyFields', JSON.stringify(copy));
  localStorage.setItem('graphicFields', JSON.stringify(graphics));
  localStorage.setItem('backupFields', JSON.stringify(backups));
  dispatch(fetchAllFieldsSuccess());
}

export const fetchFields = () => {
  return dispatch => {
    dispatch(fetchAllFieldsRequest());
    return fetch(`${baseUrl}/allFields`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        const { copy, graphics, backups } = data[0].fields;
        const copyFields = {
          fields: copy
        }
        const graphicFields = {
          fields: graphics
        }
        const backupFields = {
          fields: backups
        }
        localStorage.setItem('copyFields', JSON.stringify(copyFields));
        localStorage.setItem('graphicFields', JSON.stringify(graphicFields));
        localStorage.setItem('backupFields', JSON.stringify(backupFields));
        dispatch(fetchAllFieldsSuccess());
      })
      .catch(error => {
        console.log("fetchFields error", error);
        dispatch(fetchAllFieldsFailure());
      });
  }
}
