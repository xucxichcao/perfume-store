<template>
  <div class="cart">
    <v-simple-table class="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Sản phẩm
            </th>
            <th class="text-center">
              Đơn giá
            </th>
            <th class="text-center">
              Số lượng
            </th>
            <th class="text-center">
              Số tiền
            </th>
            <th class="text-center">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody class="mt-5">
          <tr v-for="item in cart" :key="item.id">
            <td class="text-left">
              <div class="hinhAnh">
                <v-img
                  :src="item.perfume_data.image"
                  :alt="item.perfume_data.name"
                  max-height="70px"
                  max-width="70px"
                  contain
                />
                <h3>{{ item.perfume_data.name }}</h3>
              </div>
            </td>
            <td class="text-center">
              {{ item.perfume_data.price | toCurrency }}
            </td>
            <td class="text-center">
              <div class="quantily">
                <v-icon
                  small
                  class="icon"
                  v-on:click="addSubAmount(item.id, item.amount, -1)"
                >
                  mdi-minus
                </v-icon>
                {{ item.amount }}
                <v-icon
                  small
                  class="icon"
                  v-on:click="addSubAmount(item.id, item.amount, 1)"
                >
                  mdi-plus
                </v-icon>
              </div>
            </td>
            <td class="text-center">
              {{ (item.perfume_data.price * item.amount) | toCurrency }}
            </td>
            <td class="text-center">
              <v-btn text color="error" @click="deleted(item.id)">
                <v-icon small>fas fa-trash-alt</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="buy">
      <v-btn color="primary" @click="buy()">Mua hàng</v-btn>
    </div>
  </div>
</template>

<script>
import NHDataServices from "../../services/NHDataServices";
export default {
  data: () => ({
    cart: [],
  }),
  methods: {
    retrieveCart() {
      NHDataServices.getCart().then((response) => {
        this.cart = response.data;
      });
    },
    async buy() {
      if (this.cart.length == 0) return;
      var perfumeData = [];
      this.cart.forEach((element) => {
        perfumeData.push({ id: element.perfume, amount: element.amount });
      });
      await NHDataServices.buy().then(async (res) => {
        var orderID = res.data.id;
        await NHDataServices.addOrderDetail(orderID, perfumeData);
      });
      for (let i = 0; i < this.cart.length; i++) {
        await NHDataServices.deleteCart(this.cart[i].id);
      }
      await this.$root.$refs.navbar.retrieveCart();
      this.$router.push("/order");
    },
    async deleted(id) {
      await NHDataServices.deleteCart(id);
      this.retrieveCart();
    },
    async addSubAmount(id, amt, num) {
      if (amt == 1 && num == -1) return;
      var newAmount = amt + num;
      await NHDataServices.changeAmountCartByID(id, newAmount).then((res) => {
        console.log(res);
        this.retrieveCart();
      });
      this.$root.$refs.navbar.retrieveCart();
    },
  },
  mounted() {
    this.retrieveCart();
    console.log(this.cart);
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

<style>
.cart {
  max-width: 1200px;
  margin: 0 auto;
}

.text {
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantily {
  border: 1px solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.hinhAnh {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.hinhAnh img {
  margin: 1em 1em 1em 0;
}

.table {
  margin-top: 1rem;
}

.table thead {
  background-color: #009688;
}

.table thead tr th {
  color: white !important;
  font-size: 15px !important;
}

.table tbody tr:hover {
  background: none !important;
}

.icon {
  cursor: pointer;
}

.buy {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 2em 0;
}
</style>
