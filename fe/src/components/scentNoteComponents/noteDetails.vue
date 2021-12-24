<template>
  <v-container>
    <v-card light>
      <v-container>
        <v-row justify="start">
          <v-col cols="auto" class="py-0 pr-0" align-self="center">
            <v-btn icon plain :to="{ name: 'scentList' }">
              <v-icon>fas fa-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col align-self="center">
            <div class="noteTitle">Nước hoa thuộc nhóm {{ scent.name }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-divider></v-divider>
        </v-row>
        <v-row justify="center">
          <v-col cols="2" md="3" v-for="(perfume, i) in perfumes" :key="i">
            <v-hover v-slot="{ hover }">
              <v-card
                :ripple="false"
                link
                :to="{
                  name: 'perfumeDetail',
                  params: { perfumeSlug: perfume.sname },
                }"
                class="mx-auto"
                :elevation="hover ? 12 : 0"
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
  </v-container>
</template>
<script>
import NHDataServices from "../../services/NHDataServices";
export default {
  props: {
    noteSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      perfumes: {},
      scent: {},
    };
  },
  methods: {
    async retrieveScent() {
      await NHDataServices.getPerfumeByScent(this.noteSlug)
        .then((response) => {
          const waiting = response.data;
          this.perfumes = waiting;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async retrieveScentByID() {
      await NHDataServices.getScentByID(this.noteSlug)
        .then((response) => {
          const waiting = response.data;
          this.scent = waiting;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  async created() {
    await this.retrieveScent();
    await this.retrieveScentByID();
  },
};
</script>

<style lang="scss" scope>
@import "../../../node_modules/rfs/scss.scss";

.noteTitle {
  @include font-size(25px);
  text-transform: lowercase;
}

.noteTitle::first-letter {
  text-transform: uppercase;
}
</style>
