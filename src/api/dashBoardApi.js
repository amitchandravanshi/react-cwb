import configDeterminator from "../configs/configDeterminator";
import axios from "axios";

export const getAllAssignmentForUser = emailId => {
  const url = "assignment.json";
  // const url = configDeterminator.cmpApiEndpoint + "/assignments?search=" + emailId;
  return axios.get(url);
};