<template>
  <v-container>
    <v-card light elevation="2">
      <v-container fluid class="px-md-5 pt-md-5">
        <!-- <v-row justify="center">
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
            md="2"
            v-for="(perfume, i) in perfumes"
            :class="isSelected[perfume.filter] == 1 ? 'doDisplay' : 'noDisplay'"
            :key="i"
          >
            <v-lazy
              v-model="isSelected[perfume.filter]"
              :options="{
                threshold: 0.5,
              }"
              transition="scale-transition"
              min-height="200"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  :ripple="false"
                  link
                  :to="{
                    name: 'perfumeDetail',
                    params: { perfumeSlug: perfume.sname },
                  }"
                  class="mx-auto"
                  outlined
                  :elevation="hover ? 5 : 0"
                >
                  <v-container>
                    <v-row justify="center">
                      <v-img
                        max-width="70%"
                        contain
                        :alt="perfume.name"
                        height="15vh"
                        :src="
                          require(`../../assets/brands/` +
                            perfume.brand +
                            '/' +
                            perfume.sname +
                            '.jpg')
                        "
                      />
                    </v-row>
                  </v-container>
                  <v-card-title> {{ perfume.name }}</v-card-title>
                </v-card>
              </v-hover>
            </v-lazy>
          </v-col>
        </v-row> -->
        <v-row justify="center">
          <v-col cols="12" md="3">
            <v-card outlined>
              <v-card-title>Nhãn hiệu</v-card-title>
              <v-card-text class="myFilter">
                <v-checkbox
                  class="mt-0"
                  v-for="(brand, i) in brandList"
                  :key="i"
                  v-model="selectedBrand"
                  :label="brand.name"
                  :value="brand.id"
                  @change="changeBrandFilter()"
                ></v-checkbox>
              </v-card-text>
            </v-card>
            <v-card outlined class="mt-5">
              <v-card-title>Nhóm mùi</v-card-title>
              <v-card-text class="myFilter">
                <v-checkbox
                  class="mt-0"
                  v-for="(scent, i) in scentNotes"
                  :key="i"
                  v-model="selectedScent"
                  :label="scent.name"
                  :value="scent.id"
                  @change="changeScentFilter()"
                ></v-checkbox>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="9">
            <v-card class="pa-0" :loading="loading" elevation="0">
              <template slot="progress">
                <v-progress-linear
                  color="primary"
                  height="3"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-row>
                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                  v-for="(perfume, i) in perfumes"
                  :key="i"
                >
                  <v-hover v-slot="{ hover }">
                    <v-card
                      :ripple="false"
                      link
                      :to="{
                        name: 'perfumeDetail',
                        params: { perfumeSlug: perfume.sname }
                      }"
                      class="mx-auto"
                      outlined
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
                      <v-card-subtitle>{{
                        perfume.brand.toUpperCase()
                      }}</v-card-subtitle>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import NHDataService from "../../services/NHDataServices";
import http from "../../http-common";
export default {
  data() {
    return {
      selected: 0,
      loading: false,
      brandList: [],
      scentNotes: [],
      selectedBrand: [],
      selectedScent: []
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
    retrievePerfumes() {
      this.loading = true;
      NHDataService.getPerfume()
        .then(response => {
          const waitting = response.data.map(this.getDisplayPerfume);
          this.$store.dispatch("perfume/getPerfume", waitting);
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveBrands() {
      NHDataService.getAllBrands()
        .then(response => {
          const waiting = response.data.map(this.getDisplayBrand);
          this.brandList = waiting;
        })
        .catch(e => {
          console.log(e);
        });
    },
    retrieveScentNote() {
      NHDataService.getAllScents()
        .then(response => {
          const waitting = response.data;
          this.scentNotes = waitting;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getDisplayBrand(brand) {
      return {
        id: brand.id,
        name: brand.name
      };
    },
    getDisplayPerfume(perfume) {
      return {
        name: perfume.name,
        sname: perfume.sname,
        description: perfume.description,
        brand: perfume.brand,
        image: perfume.image
      };
    },
    changeFilter() {
      this.loading = true;
      let brandString = "";
      for (let i = 0; i < this.selectedBrand.length; i++) {
        if (i < this.selectedBrand.length - 1) {
          brandString += this.selectedBrand[i];
          brandString += ",";
        } else {
          brandString += this.selectedBrand[i];
        }
      }
      let scentString = "";
      for (let i = 0; i < this.selectedScent.length; i++) {
        if (i < this.selectedScent.length - 1) {
          scentString += this.selectedScent[i];
          scentString += ",";
        } else {
          scentString += this.selectedScent[i];
        }
      }
      if (brandString.length > 0 && scentString.length == 0) {
        http
          .get(`/perfumes/?brand__in=${brandString}`)
          .then(response => {
            const waitting = response.data.map(this.getDisplayPerfume);
            this.$store.dispatch("perfume/getPerfume", waitting);
            this.loading = false;
          })
          .catch(e => {
            console.log(e);
          });
      } else if (brandString.length == 0 && scentString.length > 0) {
        http
          .get(`/perfumes/?scentnote__in=${scentString}`)
          .then(response => {
            const waitting = response.data.map(this.getDisplayPerfume);
            this.$store.dispatch("perfume/getPerfume", waitting);
            this.loading = false;
          })
          .catch(e => {
            console.log(e);
          });
      } else if (brandString.length > 0 && scentString.length > 0) {
        http
          .get(
            `/perfumes/?scentnote__in=${scentString}&brand__in=${brandString}`
          )
          .then(response => {
            const waitting = response.data.map(this.getDisplayPerfume);
            this.$store.dispatch("perfume/getPerfume", waitting);
            this.loading = false;
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        NHDataService.getPerfume()
          .then(response => {
            const waitting = response.data.map(this.getDisplayPerfume);
            this.$store.dispatch("perfume/getPerfume", waitting);
            this.loading = false;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    changeBrandFilter() {
      this.$nextTick(() => {
        this.changeFilter();
      });
    },
    changeScentFilter() {
      this.$nextTick(() => {
        this.changeFilter();
      });
    }
  },
  mounted() {
    this.retrievePerfumes();
    this.retrieveBrands();
    this.retrieveScentNote();
  },
  computed: {
    perfumes: {
      get() {
        return this.$store.getters["perfume/getPerfumeList"];
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

.myFilter {
  max-height: 200px;
  overflow: auto;
}
</style>
