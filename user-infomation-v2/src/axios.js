import axios from "axios";

const baseURL =
  window.location.origin.indexOf("localhost") > -1
    ? "http://localhost:3000/"
    : window.location.origin;

const http = axios.create({
  baseURL
});

export default http;