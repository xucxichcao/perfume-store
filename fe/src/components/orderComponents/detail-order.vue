<template>
  <div class="order">
    <v-card outlined>
      <v-card-title>Đơn hàng {{ datas.id }}</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="item in datas.details" :key="item.perfume">
            <v-list-item-avatar>
              <v-img
                :src="item.perfume_data.image"
                max-height="50px"
                max-width="50px"
                contain
                :alt="item.perfume_data.name"
              />
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    <div v-for="item in datas.details" :key="item.perfume" class="list-item">
      <div class="img">
        <div class="left">
          <v-img
            :src="item.perfume_data.image"
            max-width="70px"
            max-heght="70px"
            :alt="item.perfume_data.name"
          />
          <div class="item-detail">
            <h4 style="color: white">{{ item.perfume_data.name }}</h4>
            <p style="color: white">x{{ item.amount }}</p>
          </div>
        </div>
        <div class="p">
          <p style="color: white">{{ item.perfume_data.price | toCurrency }}</p>
        </div>
      </div>
      <div class="price">
        <h3>
          Tổng tiền: {{ (item.amount * item.perfume_data.price) | toCurrency }}
        </h3>
      </div>
    </div>
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
        this.loader = false;

        console.log(this.datas);
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

.img {
  padding: 1em;
  background-color: #009688;
  display: flex;
  justify-content: space-between;
  box-shadow: rgba(230, 224, 224, 0.1) 0px 4px 12px;
  border-bottom: 1px solid #ffffff36;
  border-radius: 5px;
}

.order .img img {
  width: 50px;
  height: 50px;
}

.left {
  display: flex;
  align-items: center;
}

.item-detail > h4,
p {
  margin-left: 1em;
  font-size: 15px;
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
  padding: 1em;
  background-color: white;
  border-radius: 5px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #08080861;
  padding: 1em;
}

.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #08080861;
  padding: 1em;
}

.list-item {
  margin: 2em 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
