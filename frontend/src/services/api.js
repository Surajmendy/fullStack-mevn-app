import axios from "axios";
import config from "../../public/config";

export default () => {
  return axios.create({
    baseURL: config.api,
    withCredentials: false,
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: null,
    },
  });
};
