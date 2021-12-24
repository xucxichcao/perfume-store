<template>
  <section id="scentNotes" class="py-10">
    <v-container class="px-5 px-md-10">
      <v-row align-content="center" justify="center" class="my-10">
        <div class="scentTitle">Một vài nhóm mùi</div>
      </v-row>
      <v-row style="padding-top: 12px" align-content="center" justify="center">
        <v-col
          class="scentNotesContainer pa-0"
          cols="6"
          md="3"
          v-for="(group, i) in groups.slice(0, 4)"
          :key="i"
        >
          <img :alt="`${group.description}`" :src="group.image" />
          <router-link :to="group.route">
            <v-container class="fluid fill-height pa-0 to-hover-text">
              <div class="layout fluid blur"></div>
              <v-container fluid class="hover-text">
                <div class="fluid caption-text">{{ group.name }}</div>
                <div class="fluid description-text">
                  {{ group.description }}
                </div>
              </v-container>
            </v-container>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import NHDataService from "../../services/NHDataServices";

export default {
  data: () => ({
    groups: [
      // {
      //   id: "aromatic",
      //   name: "Mùi thơm ngát",
      //   description: "Mùi này siêu thơm",
      //   route: "/scents/aromatic"
      // },
      // {
      //   id: "citrus",
      //   name: "Mùi cam chanh",
      //   description: "Mùi này rất thơm",
      //   route: "/scents/citrus"
      // },
      // {
      //   id: "oriental",
      //   name: "Mùi Phương Đông",
      //   description: "Mùi này rất thơm",
      //   route: "/scents/oriental"
      // },
      // {
      //   id: "woody",
      //   name: "Mùi gỗ",
      //   description: "Mùi này rất thơm",
      //   route: "/scents/woody"
      // }
    ],
  }),
  methods: {
    retrieveScents() {
      NHDataService.getAllScents()
        .then((response) => {
          const waitting = response.data.map(this.getDisplayScents);
          this.groups = this.shuffleMyArray(waitting);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayScents(scent) {
      return {
        id: scent.id,
        name: scent.name,
        description: scent.description,
        route: scent.route,
        image: scent.image,
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
    this.retrieveScents();
  },
};
</script>

<style scoped lang="scss">
@import "../../../node_modules/rfs/scss.scss";

.scentNotesContainer:hover .to-hover-text {
  opacity: 1;
}

.to-hover-text {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  opacity: 0;
  -webkit-transition: all 0.45s ease-in-out;
  -moz-transition: all 0.45s ease-in-out;
  -o-transition: all 0.45s ease-in-out;
  -ms-transition: all 0.45s ease-in-out;
  transition: all 0.45s ease-in-out;
}

.hover-text {
  z-index: 10;
  color: #fff;
  position: absolute;
  text-align: center;
}

.caption-text {
  @include font-size(35px);
  text-transform: uppercase;
}

.description-text {
  @include font-size(15px);
}

.blur {
  background-color: rgba(0, 0, 0, 0.65);
  width: 100%;
  z-index: 5;
  position: absolute;
}

.scentNotesContainer {
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.scentNotesContainer > img {
  position: absolute;
  left: -10000%;
  right: -10000%;
  top: -10000%;
  bottom: -10000%;
  margin: auto auto;
  min-width: 1000%;
  min-height: 1000%;
  -webkit-transform: scale(0.1);
  transform: scale(0.1);
  -webkit-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -ms-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
}

.scentTitle {
  @include font-size(3.75rem);
  color: #c5a47e;
  font-family: oswald;
  text-transform: uppercase;
}

@media screen and (max-width: 959.98px) {
  .scentNotesContainer {
    height: 48vh;
    border: 3px solid #ebebeb;
  }
}
@media screen and (min-width: 959.98px) {
  .scentNotesContainer {
    height: 100vh;
    border-left: 3px solid #ebebeb;
    border-right: 3px solid #ebebeb;
  }
}
</style>
