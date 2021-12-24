import Vue from "vue";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: "#212121",
        secondary: "#757575",
        accent: "#eeeeee",
        background: "#272727",
      },
      light: {
        background: "#ebebeb",
        primary: "#009688",
      },
    },
  },
  icons: {
    iconfont: "mdi", // default - only for display purposes
  },
});
