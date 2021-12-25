<template>
  <div class="order">
    <div class="list-item">
      <div v-for="item in datas" :key="item.id" class="item">
        <div class="img">
          <div class="left">
            <div class="item-detail">
              <h3>Mã đơn hàng [{{ item.id }}]</h3>
              <p>Ngày mua: {{ format_date(item.createdDate) }}</p>
            </div>
          </div>
        </div>
        <div class="price">
          <h3>Tổng tiền: {{ item.totalPrice | toCurrency }}</h3>
        </div>
        <div class="footer">
          <router-link
            tag="a"
            :to="{ name: 'Order detail', params: { orderId: item.id } }"
          >
            <v-btn color="primary">Xem chi tiết đơn hàng</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import NHDataServices from "../../services/NHDataServices";
export default {
  data: () => ({
    loading: false,
    datas: [],
  }),
  methods: {
    getOrder() {
      NHDataServices.getOrderList().then((res) => {
        this.datas = res.data.reverse();
        this.loading = false;
      });
    },
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD/MM/YYYY -- hh:mm");
      }
    },
  },
  async mounted() {
    this.loading = true;
    await this.getOrder();
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

<style scoped>
.order {
  max-width: 1200px;
  margin: 2rem auto;
}

.item {
  margin-bottom: 2em;
}

.img {
  padding: 0.2em;
  background-color: #009688;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(230, 224, 224, 0.1) 0px 4px 12px;
  border-bottom: 1px solid #ffffff36;
  border-radius: 5px;
}

.order .img img {
  width: 100px;
  height: 100px;
}

.left {
  display: flex;
}

.item-detail > h3,
p {
  color: white;
}

.p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-detail {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
}
.price {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.2em;
  background-color: white;
  border-radius: 5px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: white !important;
  padding: 0.2em;
}

a {
  text-decoration: none;
}
</style>
