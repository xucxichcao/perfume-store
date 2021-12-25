<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <navigation-bar />
    <core-view />
    <home-footer />
  </v-app>
</template>

<style>
@font-face {
  font-family: "oswald";
  src: url("assets/fonts/Oswald/Oswald-VariableFont_wght.ttf");
}

@font-face {
  font-family: "Open Sans Condensed";
  src: url("assets/fonts/Open Sans Condensed/OpenSansCondensed-Light.ttf");
}

@font-face {
  font-family: "cinzel";
  src: url("assets/fonts/Cinzel/Cinzel-VariableFont_wght.ttf");
}

@font-face {
  font-family: "Crimson Pro";
  src: url("assets/fonts/Crimson_Pro/CrimsonPro-VariableFont_wght.ttf");
}
</style>

<script>
import CoreView from "./components/core/coreView.vue";
import NavigationBar from "./components/core/NavigationBar";
import HomeFooter from "./components/core/homeFooter";
import { setAxiosAuthToken } from "./helpers/auth-header";
export default {
  name: "App",

  components: { NavigationBar, CoreView, HomeFooter },
  methods: {
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
  created: function() {
    if (!this.isEmpty(localStorage.getItem("token"))) {
      this.$store.dispatch("user/setToken", localStorage.getItem("token"));
      this.$store.dispatch("user/setIsAuthenticated", true);
      setAxiosAuthToken(localStorage.getItem("token"));
    }
    if (!this.isEmpty(localStorage.getItem("user")))
      this.$store.dispatch(
        "user/setUser",
        JSON.parse(localStorage.getItem("user"))
      );
  }
};
</script>
