import store from "../store/index";
import http from "../http-common";
import { setAxiosAuthToken } from "../helpers/auth-header";

export const userService = {
  login,
  logout,
  signup,
  // getAll,
  // getById,
  // update,
  // delete: _delete
};

function login(username, password) {
  const userData = {
    username,
    password,
  };
  return http
    .post("/token/login/", userData)
    .then((response) => {
      const authToken = response.data["auth_token"];
      store.dispatch("user/setIsAuthenticated", true);
      setToken(authToken);
      getCurrentUser();
      store.dispatch("navbar/loginOrSignup");
    })
    .catch((error) => {
      unsetCurrentUser();
      if (error.response) {
        store.dispatch(
          "loginsignupError/setLoginErrorMessages",
          error.response.data["non_field_error"]
        );
        store.dispatch("user/setIsAuthenticated", false);
      } else if (error.message) {
        store.dispatch("loginsignupError/setLoginErrorMessages", error.message);
      }
    });
}

function getCurrentUser() {
  return http
    .get("/users/me/")
    .then((response) => {
      const user = {
        username: response.data.username,
        email: response.data.email,
      };
      setCurrentUser(user);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

function setCurrentUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
  store.dispatch("user/setUser", user);
}

function setToken(token) {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  store.dispatch("user/setToken", token);
}

function unsetCurrentUser() {
  setAxiosAuthToken("");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  store.dispatch("user/unsetUser");
}

function logout() {
  http.post("/token/logout/").then(unsetCurrentUser);
}

function signup(username, password) {
  store.dispatch("navbar/setIsSubmitting");
  const userData = {
    username,
    password,
  };
  http
    .post("/users/", userData)
    .then(() => {
      const successMessage = "Đã tạo thành công tài khoản " + userData.username;
      store.dispatch("loginsignupError/setSuccess", successMessage);
    })
    .then(() => {
      store.dispatch("navbar/setIsSubmitting");
      setTimeout(() => {
        store.dispatch("loginsignupError/noError");
        store.dispatch("navbar/setFormLoginSignup", 1);
      }, 1500);
    })
    .catch((error) => {
      store.dispatch("navbar/setIsSubmitting");
      if (error.response) {
        const errorObject = error.response.data;
        if (Object.prototype.hasOwnProperty.call(errorObject, "username")) {
          store.dispatch(
            "loginsignupError/setUsernameError",
            errorObject["username"]
          );
        }
        if (Object.prototype.hasOwnProperty.call(errorObject, "password"))
          store.dispatch(
            "loginsignupError/setPasswordError",
            errorObject["password"]
          );
      } else if (error.message) {
        alert(error.message);
      }
    });
}
