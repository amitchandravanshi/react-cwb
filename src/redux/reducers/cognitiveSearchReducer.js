const initialState = {};

const cognitiveSearchReducer = ( state = initialState,{ action } ) => dispatch => {
  switch (action.type) {
    case "HELLO_REDUX":
      return { ...state, saidHello: true, from: action.payload };
    default:
      return state;
  }
};

export default cognitiveSearchReducer;
