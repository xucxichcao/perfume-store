<template>
  <section class="homePageCarousel">
    <v-carousel
      continuous
      hide-delimiter-background
      :show-arrows="false"
      height="$vuetify.breakpoint.smAndDown? 25vh:45vh"
      cycle
      interval="3000"
    >
      <v-carousel-item eager v-for="image in slideImg" :key="image.i">
        <v-img
          max-height="45vh"
          :src="require(`../../assets/images/slide/${image.i}.jpg`)"
        />
      </v-carousel-item>
    </v-carousel>
  </section>
</template>

<script>
export default {
  data() {
    return {
      slideImg: [{ i: 1 }, { i: 2 }]
    };
  }
};
</script>
