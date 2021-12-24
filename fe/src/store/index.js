import Vue from "vue";
import Vuex from "vuex";

//import currentUser from "./modules/user";
import navbar from "./modules/navbar";
import user from "./modules/user";
import loginsignupError from "./modules/loginSignupError";
import brand from "./modules/brand";
import perfume from "./modules/perfume";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    navbar,
    user,
    loginsignupError,
    brand,
    perfume
  }
});
