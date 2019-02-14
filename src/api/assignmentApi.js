import configDeterminator from "../configs/configDeterminator";
import axios from "axios";

export const getAssignmentDetails = postId => {
  return axios.get(configDeterminator.cmpApiEndpoint + "/posts" + postId, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const createAssignmentDetails = assignmentData => {
  return axios.put(configDeterminator.cwbApiEndpoint + "/assignment", {
    percolateId: assignmentData.percolateId,
    assignmentName: assignmentData.assignmentName,
    templateName: assignmentData.templateName,
    userInitials: assignmentData.userInitials,
    workfrontJobId: assignmentData.workfrontJobId
  });
};
