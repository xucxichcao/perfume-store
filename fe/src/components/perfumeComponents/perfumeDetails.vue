<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="1" order-md="0" order="2">
        <v-container class="pa-0 mySticky">
          <v-card light>
            <v-card-title style="justify-content: center">Chia sẻ</v-card-title>
            <v-card-text class="px-8 pb-8">
              <v-row justify="center" class="noDecorationLink">
                <v-col cols="3" md="12">
                  <s-facebook
                    :window-features="{}"
                    :use-native-behavior="false"
                    :share-options="{
                      url: $route.query.page,
                      quote: perfume[0].name,
                      hashtag: '#Perfume',
                    }"
                  >
                    <v-icon color="indigo darken-2" large
                      >fab fa-facebook-f</v-icon
                    >
                  </s-facebook>
                </v-col>
                <v-col cols="3" md="12">
                  <s-twitter
                    :windowFeatures="{}"
                    :shareOptions="{
                      url: $route.query.page,
                      text: perfume[0].name,
                      hashtags: ['Perfume', perfume[0].sname],
                    }"
                    :useNativeBehavior="false"
                    ><v-icon color="blue lighten-2" large>
                      fab fa-twitter
                    </v-icon></s-twitter
                  >
                </v-col>
                <v-col cols="3" md="12">
                  <s-telegram
                    :window-features="{}"
                    :use-native-behavior="false"
                    :share-options="{
                      url: $route.query.page,
                      text: perfume[0].name,
                    }"
                  >
                    <v-icon color="blue darken-1" large>
                      fab fa-telegram-plane
                    </v-icon>
                  </s-telegram>
                </v-col>
                <v-col cols="3" md="12">
                  <s-whats-app
                    :window-features="{}"
                    :use-native-behavior="false"
                    :share-options="{
                      text: $route.query.page,
                    }"
                  >
                    <v-icon color="teal darken-1" large>
                      fab fa-whatsapp</v-icon
                    >
                  </s-whats-app>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
      <v-col cols="12" md="7" order-md="1" order="1">
        <v-card light class="pa-8">
          <v-row>
            <v-col cols="12" md="5">
              <v-row justify="center">
                <v-img
                  contain
                  :alt="perfume[0].name"
                  max-height="35vh"
                  :src="perfume[0].image"
                />
              </v-row>
            </v-col>
            <v-col cols="9" md="7" class="mt-5">
              <v-row>
                <div class="perfumeName">{{ perfume[0].name }}</div>
              </v-row>
              <v-row class="mb-5">
                <router-link
                  class="brandRouterLink"
                  :to="`/brands/` + perfume[0].brand"
                  >{{ perfume[0].brandname }}</router-link
                >
              </v-row>
              <v-row align="center">
                <div class="noteTitle">Nhóm mùi hương:</div>
                <div class="noteContent">{{ perfume[0].scentnote }}</div>
              </v-row>
              <v-row align="center">
                <div class="noteTitle">Năm sản xuất:</div>
                <div class="noteContent">
                  {{ perfume[0].yearofreleasing }}
                </div>
              </v-row>
              <v-row align="center">
                <div class="noteTitle">Giới tính:</div>
                <div class="noteContent">{{ perfume[0].sex }}</div>
              </v-row>
              <v-row align="center">
                <div class="noteTitle">Hương đầu:</div>
                <div class="noteContent">{{ perfume[0].topnote }}</div>
              </v-row>
              <v-row align="center">
                <div class="noteTitle">Hương giữa:</div>
                <div class="noteContent">{{ perfume[0].midnote }}</div>
              </v-row>
              <v-row align="center">
                <div class="noteTitle">Hương cuối:</div>
                <div class="noteContent">{{ perfume[0].basenote }}</div>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card light class="mt-5 pa-8">
          <v-row>
            <div class="myTitle">Nhận xét</div>
          </v-row>
          <v-row>
            <div class="perfumeDes mt-md-5">
              {{ perfume[0].description }}
            </div>
          </v-row>
        </v-card>
        <v-card light class="mt-5 pa-8">
          <v-row>
            <div class="myTitle">Đánh giá của người dùng</div>
          </v-row>
          <v-row justify="center">
            <v-col cols="12">
              <v-expansion-panels
                accordion
                v-if="isAuthenticated && !perfume[0].is_rated"
              >
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    <div class="expanHeader">Để lại cảm nhận của bạn</div>
                    <template v-slot:actions>
                      <v-icon color="primary"></v-icon>
                    </template>
                  </v-expansion-panel-header>

                  <v-expansion-panel-content>
                    <v-container>
                      <v-row>
                        <v-textarea
                          outlined
                          v-model="userrate.content"
                          placeholder="Nội dung"
                        ></v-textarea>
                      </v-row>
                      <v-row no-gutters>
                        <v-col
                          cols="12"
                          md="4"
                          class="d-flex"
                          style="align-items: center; justify-content: center"
                        >
                          <div>Mùi hương:</div>
                          <v-rating
                            background-color="yellow darken-1"
                            color="yellow darken-3"
                            length="5"
                            size="15"
                            v-model="userrate.perfume"
                          >
                          </v-rating>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                          class="d-flex"
                          style="align-items: center; justify-content: center"
                        >
                          <div>Độ tỏa hương:</div>
                          <v-rating
                            background-color="blue darken-1"
                            color="blue darken-3"
                            length="5"
                            size="15"
                            v-model="userrate.sillage"
                          >
                          </v-rating>
                        </v-col>
                        <v-col
                          cols="12"
                          md="4"
                          class="d-flex"
                          style="align-items: center; justify-content: center"
                        >
                          <div>Độ lưu hương:</div>
                          <v-rating
                            background-color="red darken-1"
                            color="red darken-3"
                            length="5"
                            size="15"
                            v-model="userrate.longevity"
                          >
                          </v-rating>
                        </v-col>
                      </v-row>
                      <v-row justify="end">
                        <v-col cols="auto">
                          <v-btn
                            @click="sendRate()"
                            outlined
                            color="blue lighten-1"
                            >Gửi đánh giá</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
            <v-col cols="12" v-for="(rate, i) in rates" :key="i">
              <v-card min-height="100px" flat outlined light>
                <v-container class="py-5">
                  <v-menu
                    v-if="rate.user == $store.getters['user/getUsername']"
                    bottom
                    left
                    absolute
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        dark
                        icon
                        v-bind="attrs"
                        v-on="on"
                        class="rateMenu"
                      >
                        <v-icon color="black">mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>
                    <v-list light>
                      <v-list-item @click="clickDeleteRate(rate)">
                        <v-list-item-title>Xóa</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                  <v-row>
                    <v-col cols="1" class="pa-0">
                      <v-tooltip color="red" :disabled="isAuthenticated" right>
                        <template v-slot:activator="{ on, attrs }">
                          <div class="updownvoteDiv" v-bind="attrs" v-on="on">
                            <v-btn
                              :disabled="!isAuthenticated"
                              @click="
                                rate.is_up_voted
                                  ? clickRemoveVote(rate)
                                  : clickVote(rate, 1)
                              "
                              icon
                              ><v-icon
                                :color="rate.is_up_voted ? 'blue' : 'black'"
                                >fas fa-chevron-up</v-icon
                              ></v-btn
                            >
                            <span>{{ rate.vote }}</span>
                            <v-btn
                              :disabled="!isAuthenticated"
                              @click="
                                rate.is_down_voted
                                  ? clickRemoveVote(rate)
                                  : clickVote(rate, -1)
                              "
                              icon
                              ><v-icon
                                :color="rate.is_down_voted ? 'red' : 'black'"
                                >fas fa-chevron-down</v-icon
                              ></v-btn
                            >
                          </div>
                        </template>
                        <span>Vui lòng đăng nhập</span>
                      </v-tooltip>
                    </v-col>
                    <v-col>
                      <div class="rateUser pb-3">
                        {{ rate.user }}
                        <v-rating
                          background-color="yellow darken-1"
                          color="yellow darken-3"
                          readonly
                          dense
                          length="5"
                          size="12"
                          :value="rate.perfumepoint"
                        ></v-rating>
                      </div>
                      <div class="rateText">{{ rate.content }}</div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" order-md="2" order="0">
        <v-container class="pa-0 mySticky">
          <v-card light>
            <v-card-title>Người dùng đánh giá</v-card-title>
            <v-card-text class="px-8 pb-8">
              <v-row justify="center">
                <v-rating
                  background-color="yellow darken-1"
                  color="yellow darken-3"
                  readonly
                  half-increments
                  length="5"
                  size="25"
                  :value="perfume[0].point"
                ></v-rating>
              </v-row>
              <v-row>
                <v-col cols="12" align-self="center">
                  <v-row align="center">
                    <div class="noteTitle">Độ tỏa hương:</div>
                    <v-progress-linear
                      color="blue"
                      :value="perfume[0].longevity * 20"
                    ></v-progress-linear>
                  </v-row>
                  <v-row align="center">
                    <div class="noteTitle">Độ lưu hương:</div>
                    <v-progress-linear
                      color="red"
                      :value="perfume[0].sillage * 20"
                    ></v-progress-linear>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card light class="mt-5">
            <v-card-title>Giá cả</v-card-title>
            <v-card-text class="px-8">
              <v-row>
                <v-col cols="9" class="px-0" align-self="start">
                  <div class="price">
                    <div class="priceTitle">
                      {{ perfume[0].price | toCurrency }}
                    </div>
                    <div class="priceSub">
                      100ml
                    </div>
                  </div>
                </v-col>
                <v-col cols="3" class="px-0" align-self="end">
                  <v-btn
                    depressed
                    color="primary"
                    class="float-right"
                    @click="addToCart()"
                  >
                    Mua
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NHDataService from "../../services/NHDataServices";

export default {
  props: {
    perfumeSlug: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      perfume: {},
      rates: {},
      userrate: {
        content: "",
        perfume: 0,
        sillage: 0,
        longevity: 0,
      },
    };
  },
  methods: {
    async retrievePerfumes() {
      await NHDataService.getPerfumeByName(this.perfumeSlug)
        .then((response) => {
          const waiting = response.data.map(this.getDisplayPerfume);
          this.perfume = waiting;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayPerfume(perfume) {
      return {
        id: perfume.id,
        name: perfume.name,
        sname: perfume.sname,
        description: perfume.description,
        brand: perfume.brand,
        brandname: perfume.brand
          .split("-")
          .map((word) => {
            return word.slice(0, 1).toUpperCase() + word.slice(1);
          })
          .join(" "),
        topnote: perfume.topnote,
        midnote: perfume.midnote,
        basenote: perfume.basenote,
        scentnote: perfume.scentnote,
        yearofreleasing: perfume.yearofreleasing,
        point: perfume.point,
        longevity: perfume.longevity,
        sillage: perfume.sillage,
        sex: perfume.sex,
        is_rated: perfume.is_rated,
        image: perfume.image,
        price: perfume.price,
        sale: perfume.sale,
      };
    },
    async retrieveRate() {
      await NHDataService.getRateByPerfume(this.perfume[0].id)
        .then((response) => {
          this.rates = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async clickVote(rate, point) {
      if (
        (point == 1 && rate.is_down_voted) ||
        (point == -1 && rate.is_up_voted)
      ) {
        await this.clickRemoveVote(rate);
        await NHDataService.postVoteForRate(rate.id, point);
      } else {
        await NHDataService.postVoteForRate(rate.id, point);
      }
      await this.retrieveRate();
    },
    async clickRemoveVote(rate) {
      await NHDataService.deleteVoteForRate(rate.vote_id);
      await this.retrievePerfumes();
      await this.retrieveRate();
    },
    async clickDeleteRate(rate) {
      await NHDataService.deleteRateForPerfume(rate.id);
      await this.retrievePerfumes();
      await this.retrieveRate();
    },
    async sendRate() {
      await NHDataService.postRateForPerfume(
        this.perfume[0].id,
        this.userrate.perfume,
        this.userrate.longevity,
        this.userrate.sillage,
        this.userrate.content
      );
      await this.retrievePerfumes();
      await this.retrieveRate();
    },
    async addToCart() {
      await NHDataService.addToCart(this.perfume[0])
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
      this.$root.$refs.navbar.retrieveCart();
    },
  },
  async created() {
    await this.retrievePerfumes();
    await this.retrieveRate();
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/getAuthen"];
    },
  },
  filters: {
    toCurrency: (value) => {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../node_modules/rfs/scss.scss";

.rateMenu {
  position: absolute;
  top: 15px;
  right: 15px;
}

.expanHeader {
  @include font-size(20px);
  text-align: center;
}

.updownvoteDiv {
  top: 0%;
  right: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.rateText {
  margin-top: 5px;
  @include font-size(17px);
  font-weight: 400;
  word-break: break-word;
  line-height: 20px;
  color: rgb(36, 36, 36);
  white-space: pre-line;
}

.rateUser {
  @include font-size(22px);
  font-weight: 700;
  line-height: 1;
}

.noDecorationLink > div > a {
  text-decoration: none;
}

.noDecorationLink > div {
  display: flex;
  justify-content: center;
}

.mySticky {
  position: sticky;
  top: 74px;
}

.perfumeName {
  @include font-size(3rem);
}

.myTitle {
  margin-top: 10px;
  @include font-size(2.5rem);
}

.brandRouterLink {
  text-decoration: none;
  text-transform: uppercase;
  @include font-size(20px);
}

.perfumeDes {
  @include font-size(18px);
  white-space: pre-line;
}

.noteTitle {
  @include font-size(18px);
  margin: 5px 8px 5px 0px;
  font-weight: bold;
}

.priceTitle {
  @include font-size(15px);
  margin: 0px;
  font-weight: bold;
}

.priceTitle.right {
  text-align: right;
}

.noteContent {
  @include font-size(18px);
}
</style>
