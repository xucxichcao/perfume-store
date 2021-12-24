import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import VueSocials from "vue-socials";
import InstantSearch from "vue-instantsearch";

Vue.use(VueSocials);
Vue.use(InstantSearch);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
