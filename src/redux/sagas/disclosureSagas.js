import { put, takeLatest, call } from "redux-saga/effects";
import {
  FETCH_DISCLOSURE,
  FETCH_DISCLOSURE_FAILED,
  ADD_DISCLOSURE
} from "../constants/disclosureConstants";

import {
  fetchErrorDisclosureDetails
} from "../actions/disclosureActions";


function* disclosureDetails(action) {
    try {
        //const response = yield call(getDisclosureDetails,action.payload);

        //yield put(receiveDisclosureDetails(response.data));

    } catch (error) {
        yield put(fetchErrorDisclosureDetails(error));
    }
}

function* disclosureSagas(action) {
    yield takeLatest(ADD_DISCLOSURE, disclosureDetails);
}

export default disclosureSagas;