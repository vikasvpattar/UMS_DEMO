import axios from "axios";
import { handleError, handleResponse } from "./reponses";

const headers = {
  Authorization: `Bearer ${sessionStorage.getItem("UMS_auth")}`,
  "Content-Type": "application/json",
};

export const Http = {
  get: async (url) => {
    const config = {
      method: "get",
      headers: headers,
      url: url,
    };
    const response = await axios(config);
    return response;
  },
  post: async (url, data) => {
    const config = {
      method: "post",
      headers: headers,
      url: url,
      data: data,
    };
    console.log(config);
    const response = await axios(config);
    return response;
  },
  put: async (url, data) => {
    const config = {
      method: "put",
      headers: headers,
      url: url,
      data: data,
    };
    const response = await axios(config);
    return response;
  },
};
