const state = {
  user: {},
  isAuthenticated: false,
  token: ""
};
const getters = {
  getAuthen(state) {
    return state.isAuthenticated;
  },
  getUsername(state) {
    return state.user.username;
  }
};
const actions = {
  setIsAuthenticated(context, payload) {
    context.commit("SET_IS_AUTHENTICATED", payload);
  },
  setUser(context, payload) {
    context.commit("SET_CURRENT_USER", payload);
  },
  setToken(context, payload) {
    context.commit("SET_TOKEN", payload);
  },
  unsetUser(context) {
    context.commit("UNSET_CURRENT_USER");
  }
};
const mutations = {
  SET_IS_AUTHENTICATED(state, value) {
    state.isAuthenticated = value;
  },
  SET_CURRENT_USER(state, value) {
    state.user = value;
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  UNSET_CURRENT_USER(state) {
    state.user = {};
    state.isAuthenticated = false;
    state.token = "";
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
