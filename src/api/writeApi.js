import configDeterminator from "../configs/configDeterminator";
import axios from "axios";
import _ from "lodash";
export const getWrite = postId => {
  let url = "write.json";
  // let url = configDeterminator.cwbApiEndpoint + "/assignment" + postId;
  return axios.get(url);
};
export const deleteGraphics = ({
  graphicId
}) => {
  return axios.delete(
    configDeterminator.cwbApiEndpoint + "/graphics/" + graphicId
  );
};
export const updateUserLastLogin = user => {
  return axios.put(configDeterminator.cwbApiEndpoint + "/users", user);
};

export const uploadFileApi = ({
  file,
  url = "/graphics",
  assignmentId,
  userId,
  name,
  id,
  graphicShortCode
}) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  formData.append("userId", userId);
  formData.append("postId", assignmentId);
  formData.append("graphicShortCode", graphicShortCode);
  if (url == "/graphics") {
    formData.append("graphicId", id);
  } else {
    formData.append("backupId", id);
  }

  if (name) {
    return axios.put(configDeterminator.cwbApiEndpoint + url, formData);
  } else {
    return axios.post(configDeterminator.cwbApiEndpoint + url, formData);
  }
};
export const deleteBackups = ({
  backupId,
  backup
}) => {
  return axios.delete(
    configDeterminator.cwbApiEndpoint + "/backups/" + backupId
  );
};
export const saveWriteFormAPI = ({
  write,
  user
}) => {
  return axios.put(
    configDeterminator.cwbApiEndpoint + "/assignment/" + user.assignment.id,
    write.write
  );
};
export const createProofApi = payload => {
  return axios.post(configDeterminator.legalApiEndpoint + "/proof?", {
    ...payload
  });
};
export const createProofVersionApi = payload => {
  return axios.post(`${configDeterminator.legalApiEndpoint}/proof-version`, {
    ...payload
  });
};

export const createPersistproofAPI = payload => {
  return axios.put(
    `${configDeterminator.cwbApiEndpoint}/persist-proof/${payload.id}`, {
      ...payload
    }
  );
};

export const deleteSocialPostAPI = id => {
  return axios.delete(`${configDeterminator.cwbApiEndpoint}/socialMedia/${id}`);
};

export const uploadSocialFileApi = ({
  file,
  type,
  assignmentId,
  userId,
  name,
  id,
  status
}) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  formData.append("userId", userId);
  formData.append("postId", assignmentId);
  formData.append("mediaType", type);
  formData.append("socialMediaId", id);

  if (file.name && status !== "new") {
    return axios.put(
      configDeterminator.cwbApiEndpoint + "/socialMedia",
      formData
    );
  } else {
    return axios.post(
      configDeterminator.cwbApiEndpoint + "/socialMedia",
      formData
    );
  }
};