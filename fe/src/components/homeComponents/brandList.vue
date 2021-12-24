<template>
  <section id="brandList" class="py-10">
    <v-container>
      <v-row align-content="center" justify="center" class="my-10">
        <div class="brandTitle">Các nhãn nước hoa</div>
      </v-row>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="(brand, i) in brands.slice(0, 4)"
          :key="i"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              outlined
              light
              class="mx-auto pt-5"
              :elevation="hover ? 5 : 2"
            >
              <v-img
                contain
                :alt="brand.name"
                height="25vh"
                width="20vw"
                :src="brand.image"
              />
              <v-card-title> {{ brand.name }}</v-card-title>
              <v-card-subtitle> {{ brand.place }} </v-card-subtitle>
              <v-card-actions>
                <v-btn :to="`/brands/` + brand.id" text>
                  Xem thêm
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import NHDataService from "../../services/NHDataServices";

export default {
  data: () => ({
    brands: [],
  }),
  methods: {
    retrieveBrands() {
      NHDataService.getAllBrands()
        .then((response) => {
          const waitting = response.data.map(this.getDisplayBrand);
          this.brands = this.shuffleMyArray(waitting);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayBrand(brand) {
      return {
        id: brand.id,
        name: brand.name,
        place: brand.place,
        image: brand.image,
      };
    },
    shuffleMyArray(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
  },
  mounted() {
    this.retrieveBrands();
  },
};
</script>

<style scoped lang="scss">
@import "../../../node_modules/rfs/scss.scss";

.v-card > .v-image {
  margin: 0px auto;
  padding-top: 5px;
}

.brandTitle {
  @include font-size(3.75rem);
  color: #c5a47e;
  font-family: oswald;
  text-transform: uppercase;
}
</style>
