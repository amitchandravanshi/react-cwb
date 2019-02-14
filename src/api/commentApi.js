import configDeterminator from "../configs/configDeterminator";
import axios from "axios";
import _ from "lodash";

export const getCommentAPI = postID => {
  return axios.get(configDeterminator.cwbApiEndpoint + "/comments/" + postID);
};
export const postCommentAPI = data => {
  return axios.post(configDeterminator.cwbApiEndpoint + "/comments", data);
};
