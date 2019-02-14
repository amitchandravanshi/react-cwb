import {
  FETCH_TAG_FILTERS,
  ADD_TAG_FILTERS,
  DELETE_TAG_FILTERS,
  INITIAL_TAG_STATE
} from "../constants/tagFilterConstants";

const initialState = {
    tagFilter:  INITIAL_TAG_STATE
};

const tagFilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TAG_FILTERS:
            return {
              ...state,
                  tagFilter:  []
    };

    case ADD_TAG_FILTERS:

    return {
      ...state,
            tagFilter: action.payload      
    };
 
        default:
    return state;
    }
    };

export default tagFilterReducer;
