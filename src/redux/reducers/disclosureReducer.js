import {
  FETCH_DISCLOSURE,
  FETCH_DISCLOSURE_SUCCEEDED,
  FETCH_DISCLOSURE_FAILED,
  ADD_DISCLOSURE
} from "../constants/disclosureConstants";

const initialState = {
    disclosure: [],
    loading: true,
    error: false
};

const disclosureReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DISCLOSURE:
            return {
              ...state,
              disclosure: [],
              loading: true,
              error: false
    };

    case FETCH_DISCLOSURE_SUCCEEDED:
      return {
        ...state,
        disclosure: action.payload,
        loading: false,
        error: false
    };
    case FETCH_DISCLOSURE_FAILED:
    return {
      ...state,
        disclosure: [],
        loading: false,
        error: true
    };
    case ADD_DISCLOSURE:
    return {
        ...state,
        disclosure: action.payload,
        loading: false,
        error: false
    };
    default:
return state;
}
};

export default disclosureReducer;
