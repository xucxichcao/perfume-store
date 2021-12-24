<template>
  <v-container fluid class="pt-16">
    <v-row>
      <v-img
        position="center center"
        src="../assets/images/brandPage/topImg.jpg"
        height="15vh"
        width="100vw"
      >
        <div class="myTitleContainer d-flex justify-center align-center">
          <div class="brandTitle">Nhãn hiệu</div>
        </div>
      </v-img>
    </v-row>
    <v-row class="mt-14">
      <router-view :key="$route.path" />
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
@import "../../node_modules/rfs/scss.scss";

.brandTitle {
  @include font-size(3.75rem);
  letter-spacing: 0.22em;
  color: black;
  // font-family: oswad;
  font-family: "Crimson Pro";
  text-transform: uppercase;
}

.myTitleContainer {
  width: 100%;
  height: 100%;
}
</style>

<script>
export default {
  components: {}
};
</script>
