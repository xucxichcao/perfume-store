<template>
  <section id="brandList" class="py-10">
    <v-container>
      <v-row align-content="center" justify="center" class="my-10">
        <div class="brandTitle">Nước hoa được đánh giá cao</div>
      </v-row>
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="6"
          md="3"
          v-for="(perfume, i) in perfumes.slice(0, 4)"
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
                :alt="perfume.name"
                height="25vh"
                width="20vw"
                :src="perfume.image"
              />
              <v-card-title>
                <v-badge inline :content="perfume.point">
                  {{ perfume.name }}
                </v-badge>
              </v-card-title>
              <v-card-subtitle> {{ perfume.brandname }} </v-card-subtitle>
              <v-card-text>{{
                perfume.description.length > 100
                  ? perfume.description.substring(0, 100) + "..."
                  : perfume.description
              }}</v-card-text>
              <v-card-actions>
                <v-btn
                  :to="{
                    name: 'perfumeDetail',
                    params: { perfumeSlug: perfume.sname },
                  }"
                  text
                >
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
    perfumes: [],
  }),
  methods: {
    retrievePerfumes() {
      NHDataService.getPerfumeWithOrder()
        .then((response) => {
          const waitting = response.data.map(this.getDisplayPerfume);
          this.perfumes = waitting;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayPerfume(perfume) {
      return {
        name: perfume.name,
        sname: perfume.sname,
        description: perfume.description,
        brandname: perfume.brand
          .split("-")
          .map((word) => {
            return word.slice(0, 1).toUpperCase() + word.slice(1);
          })
          .join(" ")
          .toUpperCase(),
        image: perfume.image,
        point: Math.round(perfume.point * 10) / 10,
      };
    },
  },
  mounted() {
    this.retrievePerfumes();
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
