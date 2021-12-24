const state = {
  brands: []
};
const getters = {
  getBrandList(state) {
    return state.brands;
  }
};
const actions = {
  getBrand(context, payload) {
    context.commit("GET_BRAND", payload);
  }
};
const mutations = {
  GET_BRAND(state, value) {
    state.brands = value;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
