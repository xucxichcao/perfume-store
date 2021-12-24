<template>
  <div class="order">
    <v-card outlined>
      <v-card-title>Mã đơn hàng {{ datas.id }}</v-card-title>
      <v-card-text class="pb-0">
        <v-list two-line>
          <v-list-item v-for="item in datas.details" :key="item.perfume">
            <v-list-item-avatar>
              <v-img
                :src="item.perfume_data.image"
                max-width="50px"
                contain
                :alt="item.perfume_data.name"
              />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{
                item.perfume_data.name
              }}</v-list-item-title>
              <v-list-item-subtitle>x{{ item.amount }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action-text>
              {{ (item.price * item.amount) | toCurrency }}
            </v-list-item-action-text>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-container fluid class="d-flex myContainer">
          <div class="col1">Tổng số tiền:</div>
          <div class="col2">
            {{ datas.totalPrice | toCurrency }}
          </div>
        </v-container>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import NHDataServices from "../../services/NHDataServices";
export default {
  data() {
    return {
      loading: false,
      id: this.$route.params.orderId,
      datas: [],
    };
  },
  methods: {
    getOrderDetail() {
      NHDataServices.getOrderByID(this.id).then((res) => {
        this.datas = res.data;
        this.loading = false;
      });
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
  async mounted() {
    this.loading = true;
    await this.getOrderDetail();
  },
};
</script>

<style>
.order {
  max-width: 1200px;
  margin: 2em auto;
}
.order .v-card__title {
  /* border-bottom: 1px dashed rgba(0, 0, 0, 0.3); */
  background-color: #009688 !important;
  color: #fff;
}
.order .v-card__actions {
  border-top: 1px dashed rgba(0, 0, 0, 0.3);
}
.order .v-list-item {
  border-bottom: 1px dotted rgba(0, 0, 0, 0.2);
}
.order .v-list-item:last-child {
  border-bottom: none;
}
.order .myContainer {
  gap: 2rem;
  align-content: center;
  justify-content: flex-end;
}
</style>
