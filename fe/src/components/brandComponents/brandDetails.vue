<template>
  <v-container>
    <v-row justify="start">
      <v-btn plain text x-large :to="{ name: 'brandList' }"
        >Tất cả nhãn hiệu</v-btn
      >
    </v-row>
    <v-row justify="center">
      <v-card light width="92vw" class="py-md-6">
        <v-container>
          <v-row justify="center">
            <v-img
              max-width="50vw"
              contain
              :alt="brand.name"
              max-height="15vh"
              :src="brand.image"
            />
          </v-row>
        </v-container>
        <v-card-title>{{ brand.name }}</v-card-title>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" md="4" v-for="(perfume, i) in perfumes" :key="i">
              <v-hover v-slot="{ hover }">
                <v-card
                  :ripple="false"
                  outlined
                  link
                  :to="{
                    name: 'perfumeDetail',
                    params: { perfumeSlug: perfume.sname }
                  }"
                  class="mx-auto"
                  :elevation="hover ? 5 : 0"
                >
                  <v-container>
                    <v-row justify="center">
                      <v-img
                        max-width="70%"
                        contain
                        :alt="perfume.name"
                        height="15vh"
                        :src="perfume.image"
                      />
                    </v-row>
                  </v-container>
                  <v-card-title> {{ perfume.name }}</v-card-title>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import NHDataService from "../../services/NHDataServices";

export default {
  props: {
    brandSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      brand: {},
      perfumes: {}
    };
  },
  methods: {
    retrieveBrands() {
      NHDataService.getBrand(this.brandSlug)
        .then(response => {
          const waiting = response.data;
          this.brand = waiting;
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrievePerfumes() {
      NHDataService.getPerfumeByBrand(this.brandSlug)
        .then(response => {
          const waiting = response.data;
          this.perfumes = waiting;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  async beforeMount() {
    await this.retrieveBrands();
    await this.retrievePerfumes();
  },
  computed: {}
};
</script>
