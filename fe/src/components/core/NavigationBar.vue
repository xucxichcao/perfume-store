<template>
  <div id="navigation-bar">
    <v-navigation-drawer
      style="z-index: 1002"
      app
      hide-overlay
      fixed
      v-model="drawer"
    >
      <v-list nav>
        <v-list-item-group v-model="group">
          <v-list-item
            exact
            v-for="link in links"
            :key="link.text"
            :to="{ name: link.route }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar style="opacity: 1; z-index: 1001" color="white" app fixed>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-container class="mx-auto py-0">
        <div class="d-flex align-center">
          <v-btn
            class="hidden-sm-and-down"
            v-for="link in links"
            :key="link.text"
            :to="{ name: link.route }"
            :ripple="false"
            exact
            plain
            color="black"
          >
            <span class="ml-2">{{ link.text }}</span>
          </v-btn>
          <v-spacer></v-spacer>
          <!-- <search-algolia></search-algolia> -->
          <v-dialog
            :overlay-opacity="0.95"
            v-if="!isAuthenticated"
            content-class="noBoxShadow"
            max-width="400"
            v-model="$store.state.navbar.showLoginSignup"
          >
            <login></login>
          </v-dialog>
          <v-btn
            v-if="!isAuthenticated"
            @click.stop="showDialog"
            plain
            :ripple="false"
            >Đăng ký/Đăng nhập</v-btn
          >
          <v-menu
            max-height="400px"
            :close-on-click="false"
            :close-on-content-click="false"
            left
            open-on-hover
            v-if="isAuthenticated"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <!-- <v-btn
                icon
                tile
                text
                class="noTextTrans"
                v-bind="attrs"
                v-on="on"
              > -->
              <v-badge color="teal" :content="cart.length || 0">
                <v-icon v-bind="attrs" v-on="on" small
                  >fas fa-shopping-cart</v-icon
                >
              </v-badge>
              <!-- </v-btn> -->
            </template>
            <v-card width="300px" elevation="0">
              <v-card-title>Giỏ hàng</v-card-title>
              <v-card-text v-if="cart.length > 0">
                <div class="cart-flyout">
                  <div class="item" v-for="item in cart" :key="item.id">
                    <div class="col1">
                      <v-img
                        max-width="60px"
                        height="100px"
                        contain
                        :alt="item.perfume_data.name"
                        :src="item.perfume_data.image"
                      />
                    </div>
                    <div class="col2">
                      <div class="name">{{ item.perfume_data.name }}</div>
                      <div class="price">
                        {{ item.perfume_data.price | toCurrency }}
                      </div>
                      <div class="amount">Số lượng: {{ item.amount }}</div>
                    </div>
                    <div class="col3">
                      <div class="delete">
                        <v-btn
                          color="error"
                          text
                          small
                          @click="deleteCart(item.id)"
                          >Xóa</v-btn
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
              <v-card-text v-else>
                Bạn chưa có gì trong giỏ hàng
              </v-card-text>
              <v-card-actions v-if="cart.length > 0" class="justify-end">
                <v-btn
                  text
                  depressed
                  color="green lighten-1"
                  :to="{ name: 'Cart' }"
                  >Xem giỏ hàng</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-menu>
          <v-menu v-if="isAuthenticated" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="noTextTrans ml-8"
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon small left>fas fa-user</v-icon>
                {{ $store.getters["user/getUsername"] }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-btn
                  tile
                  class="noTextTrans"
                  plain
                  :to="{ name: 'Order default' }"
                  ><v-icon left>fas fa-list-ul</v-icon>Đơn hàng đã mua</v-btn
                >
              </v-list-item>
              <v-list-item>
                <v-btn tile class="noTextTrans" plain @click="onSignout"
                  ><v-icon left>fas fa-sign-out-alt</v-icon>Đăng xuất</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import login from "../userComponents/loginSignUp";
import { userService } from "../../services/user.service";
import NHDataServices from "../../services/NHDataServices";
// import SearchAlgolia from "./searchAlgolia.vue";

export default {
  components: { login },
  name: "navbar",
  data: () => ({
    drawer: false,
    group: null,
    links: [
      { text: "Trang chủ", route: "Home" },
      { text: "Nước hoa", route: "nonePerfume" },
      { text: "Nhãn hiệu", route: "brandList" },
      { text: "Nhóm mùi hương", route: "scentList" },
      // { text: "Về chúng tôi", route: "About", isRipple: false },
    ],
    cart: [],
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters["user/getAuthen"];
    },
  },
  methods: {
    onSignout() {
      userService.logout();
      this.$store.dispatch("navbar/setReloadViewKey");
    },
    showDialog() {
      this.$store.dispatch("navbar/loginOrSignup");
    },
    retrieveCart() {
      NHDataServices.getCart().then((response) => {
        this.cart = response.data;
      });
    },
    async deleteCart(id) {
      await NHDataServices.deleteCart(id);
      this.retrieveCart();
    },
  },
  mounted() {
    this.retrieveCart();
    console.log(this.$refs);
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
  created() {
    this.$root.$refs.navbar = this;
  },
};
</script>

<style>
.noBoxShadow {
  box-shadow: none !important;
}
.noTextTrans {
  text-transform: none !important;
}
.cart-flyout {
  display: flex;
  flex-direction: column;
}
.cart-flyout .item {
  display: flex;
  gap: 1em;
  flex-direction: row;
}
.cart-flyout .item .col1 {
  flex: 20%;
}
.cart-flyout .item .col2 {
  flex: 65%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.cart-flyout .item .col2 .name {
  font-weight: bold;
}
.cart-flyout .item .col3 {
  flex: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
a {
  text-decoration: none;
}
</style>
