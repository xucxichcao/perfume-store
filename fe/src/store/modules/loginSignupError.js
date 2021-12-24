const state = {
  error: {
    loginError: "",
    signupError: {
      usernameError: "",
      passwordError: ""
    }
  },
  success: ""
};

const getters = {
  getUsernameError(state) {
    return state.error.signupError.usernameError;
  },
  getPasswordError(state) {
    return state.error.signupError.passwordError;
  },
  getLoginError(state) {
    if (state.error.loginError != "")
      return "Tên tài khoản hoặc mật khẩu không đúng";
  },
  haveLoginError(state) {
    return state.error.loginError != "";
  },
  haveSignupSuccess(state) {
    return state.success != "";
  },
  getSucces(state) {
    return state.success;
  },
  getSignupError(state) {
    if (
      state.error.signupError.usernameError == "" &&
      state.error.signupError.passwordError != ""
    ) {
      var sPassError = "";
      state.error.signupError.passwordError.forEach(error => {
        sPassError += error + "\n";
      });
      return sPassError;
    } else if (
      state.error.signupError.usernameError != "" &&
      state.error.signupError.passwordError == ""
    ) {
      var sUserError = "";
      state.error.signupError.usernameError.forEach(error => {
        sUserError += error + "\n";
      });
      return sUserError;
    } else if (
      state.error.signupError.usernameError != "" &&
      state.error.signupError.passwordError != ""
    ) {
      var sError = "";
      state.error.signupError.usernameError.forEach(error => {
        sError += error + "\n";
      });
      state.error.signupError.passwordError.forEach(error => {
        sError += error + "\n";
      });
      return sError;
    } else return "";
  },
  haveSignupError(state) {
    return (
      state.error.signupError.usernameError != "" ||
      state.error.signupError.passwordError != ""
    );
  },
  haveError(state, getters) {
    return getters.haveLoginError || getters.haveSignupError;
  },
  getMessage(state, getters) {
    if (getters.haveError) {
      if (getters.haveLoginError) return getters.getLoginError;
      else return getters.getSignupError;
    } else if (getters.haveSignupSuccess) return getters.getSucces;
    else return "";
  }
};
const actions = {
  setLoginErrorMessages(context, payload) {
    context.commit("SET_LOGIN_ERROR_MESSAGES", payload);
  },
  noError(context) {
    context.commit("NO_ERROR");
  },
  setSuccess(context, payload) {
    context.commit("SET_SUCCESS", payload);
  },
  setUsernameError(context, payload) {
    context.commit("SET_USERNAME_ERROR", payload);
  },
  setPasswordError(context, payload) {
    context.commit("SET_PASSWORD_ERROR", payload);
  }
};
const mutations = {
  SET_LOGIN_ERROR_MESSAGES(state, value) {
    state.error.loginError = value;
  },
  NO_ERROR(state) {
    state.error.loginError = "";
    state.error.signupError.usernameError = "";
    state.error.signupError.passwordError = "";
    state.success = "";
  },
  SET_SUCCESS(state, value) {
    state.success = value;
  },
  SET_USERNAME_ERROR(state, value) {
    state.error.signupError.usernameError = value;
  },
  SET_PASSWORD_ERROR(state, value) {
    state.error.signupError.passwordError = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
