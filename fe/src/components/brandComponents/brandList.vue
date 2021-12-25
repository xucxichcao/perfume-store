<template>
  <v-container>
    <v-card light>
      <v-container fluid class="px-md-5 pt-md-5">
        <v-row justify="center">
          <v-btn-toggle
            class="flexWrap"
            v-model="selected"
            dense
            mandatory
            borderless
          >
            <v-btn
              text
              v-for="(alpha, i) in alphabet"
              :key="i"
              @click="filterOnClick(i)"
              >{{ alpha }}</v-btn
            >
          </v-btn-toggle>
        </v-row>
        <v-row class="mt-14">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(brand, i) in brands"
            :class="isSelected[brand.filter] == 1 ? 'doDisplay' : 'noDisplay'"
            :key="i"
          >
            <v-lazy
              v-model="isSelected[brand.filter]"
              :options="{
                threshold: 0.5
              }"
              transition="scale-transition"
              min-height="200"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  :ripple="false"
                  link
                  outlined
                  :to="{
                    name: 'brandDetails',
                    params: { brandSlug: brand.id }
                  }"
                  class="mx-auto"
                  :elevation="hover ? 5 : 0"
                >
                  <v-container>
                    <v-row justify="center">
                      <v-img
                        max-width="70%"
                        contain
                        :alt="brand.name"
                        height="15vh"
                        :src="brand.image"
                      />
                    </v-row>
                  </v-container>
                  <v-card-title> {{ brand.name }}</v-card-title>
                </v-card>
              </v-hover>
            </v-lazy>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import NHDataService from "../../services/NHDataServices";

export default {
  data() {
    return {
      selected: 0,
      alphabet: [
        "All",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      isSelected: [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      panelSelected: 0
    };
  },
  methods: {
    filterOnClick(i) {
      if (i == 0) {
        this.isSelected.fill(1);
      } else {
        this.isSelected.fill(0);
        this.isSelected[i] = 1;
      }
    },
    retrieveBrands() {
      NHDataService.getAllBrands()
        .then(response => {
          const waitting = response.data.map(this.getDisplayBrand);
          this.$store.dispatch("brand/getBrand", waitting);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getDisplayBrand(brand) {
      return {
        id: brand.id,
        name: brand.name,
        place: brand.place,
        route: brand.route,
        image: brand.image,
        filter: brand.id.charCodeAt(0) - 96
      };
    }
  },
  mounted() {
    this.retrieveBrands();
  },
  computed: {
    brands: {
      get() {
        return this.$store.getters["brand/getBrandList"];
      }
    }
  }
};
</script>

<style scoped>
.noDisplay {
  display: none;
}

.doDisplay {
  display: block;
}

.flexWrap {
  flex-wrap: wrap;
  justify-content: center;
}
</style>
