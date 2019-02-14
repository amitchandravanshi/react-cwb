
import axios from "axios";

export const getDisclosureDetails = (param) => {
    return axios
      .post("/services/api/v1/disclosure/digPreview?previewMode=languageAndPath&"+param, {
          headers: {
              Accept: "application/json"
          }
      }).catch(error => {
       console.error(error);
   });
};
