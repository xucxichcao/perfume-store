import http from "../http-common";

export function setAxiosAuthToken(token) {
  if (token) {
    http.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    delete http.defaults.headers.common["Authorization"];
  }
}
