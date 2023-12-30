import axios, { Axios } from "axios";

const apiClient = new Axios({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default apiClient;
