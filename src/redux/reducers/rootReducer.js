import { combineReducers } from "redux";
import cognitiveSearch from "./cognitiveSearchReducer";
import assignmentReducer from "./assignmentReducer";
import userReducer from "./userReducer";
import disclosureReducer from "./disclosureReducer";
import writeReducer from "./writeReducer";
import commentReducer from "./commentReducer";
import dashBoardReducer from "./dashBoardReducer";
import tagFilterReducer from './tagFilterReducer'

// Add imported reducers here to make them available to the app via Provider in index.js
const rootReducer = combineReducers({
  userAssignments: dashBoardReducer,
  assignments: assignmentReducer,
  user: userReducer,
  disclosures:disclosureReducer,
  write:writeReducer,
  comment:commentReducer,
  filters:tagFilterReducer
});

export default rootReducer;
