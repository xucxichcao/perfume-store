import http from "../http-common";

class NHDataService {
  async getAllBrands() {
    return http.get("/brands/");
  }

  async getAllScents() {
    return http.get("/scents/");
  }

  async getScentByID(id) {
    return http.get(`/scents/${id}/`);
  }

  async getBrand(id) {
    return http.get(`/brands/${id}/`);
  }

  async getPerfumeByBrand(id) {
    return http.get(`/perfumes/?brand=${id}`);
  }

  async getPerfumeByName(id) {
    return http.get(`/perfumes/?sname=${id}`);
  }

  async getPerfume() {
    return http.get("/perfumes/");
  }

  async getPerfumeByScent(id) {
    return http.get(`/perfumes/?scentnote=${id}`);
  }

  async getRateByPerfume(id) {
    return http.get(`/rates/?perfume=${id}`);
  }

  async postRateForPerfume(perfumeID, point, longevity, sillage, content) {
    const data = {
      perfume_id: perfumeID,
      perfumepoint: point,
      longevity,
      sillage,
      content,
    };
    return http.post("/rates/", data);
  }

  async postVoteForRate(rateID, point) {
    const data = {
      rate: rateID,
      point,
    };
    return http.post("/ratevotes/", data);
  }

  async deleteVoteForRate(voteID) {
    return http.delete(`/ratevotes/${voteID}/`);
  }

  async deleteRateForPerfume(rateID) {
    return http.delete(`/rates/${rateID}/`);
  }
  async addToCart(perfume) {
    const data = {
      perfume: perfume.id,
      amount: 1,
    };
    return await http.post("/cart/", data);
  }
  async getCart() {
    return await http.get("/cart/");
  }
  async deleteCart(id) {
    return await http.delete(`/cart/${id}/`);
  }
  async buy() {
    const data = {};
    return await http.post("/order/", data);
  }
  async addOrderDetail(orderID, perfume) {
    for (let i = 0; i < perfume.length; i++) {
      var data = {
        order: orderID,
        perfume: perfume[i].id,
        amount: perfume[i].amount,
      };
      await http.post("/order-detail/", data);
    }
  }
  async getOrderList() {
    return await http.get("/order/");
  }
  async getOrderByID(id) {
    return await http.get(`/order/${id}/`);
  }
  async changeAmountCartByID(id, amount) {
    return await http.patch(`/cart/${id}/`, { amount: amount });
  }
}

export default new NHDataService();
