const state = {
  perfumes: []
};
const getters = {
  getPerfumeList(state) {
    return state.perfumes;
  }
};
const actions = {
  getPerfume(context, payload) {
    context.commit("GET_PERFUME", payload);
  }
};
const mutations = {
  GET_PERFUME(state, value) {
    state.perfumes = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
