const state = {
  showLoginSignup: false,
  formLoginSignup: 1,
  isSubmitting: false,
  reloadViewKey: 0
};
const getters = {
  getLoginSignupState(state) {
    return state.showLoginSignup;
  },
  getIsSubmitting(state) {
    return state.isSubmitting;
  },
  getForm(state) {
    return state.formLoginSignup;
  },
  getReloadViewKey(state) {
    return state.reloadViewKey;
  }
};
const actions = {
  loginOrSignup(context) {
    context.commit("SET_SHOW_LOGIN_SIGNUP");
  },
  setFormLoginSignup(context, payload) {
    context.commit("SET_FORM_LOGIN_SIGNUP", payload);
  },
  setIsSubmitting(context) {
    context.commit("SET_SUBMITTING");
  },
  setReloadViewKey(context) {
    context.commit("SET_KEY");
  }
};
const mutations = {
  SET_SHOW_LOGIN_SIGNUP(state) {
    state.showLoginSignup = !state.showLoginSignup;
  },
  SET_FORM_LOGIN_SIGNUP(state, value) {
    state.formLoginSignup = value;
  },
  SET_SUBMITTING(state) {
    state.isSubmitting = !state.isSubmitting;
  },
  SET_KEY(state) {
    state.reloadViewKey++;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
