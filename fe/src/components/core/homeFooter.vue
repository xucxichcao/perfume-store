<template>
  <v-footer dark padless class="pt-10">
    <v-card class="flex" flat tile>
      <v-card-title class="teal pa-2">
        <strong class="subheading">Fanpage của chúng tôi:</strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-container class="my-6">
        <v-row justify="center">
          <v-col offset="0" offset-md="1" cols="3">
            <v-row>
              <div class="my-6 footerCap">Nước hoa 303</div>
            </v-row>
            <v-row>
              <div class="py-4 pr-4">
                Nước hoa 303 là trang web phi lợi nhuận được lập ra kết nối
                những người yêu thích cũng như tìm hiểu về nước hoa trên khắp
                mọi miền Tổ Quốc. Hiện tại trang web đang trong quá trình khởi
                động, thiếu dữ liệu nghiêm trọng.
              </div>
            </v-row>
          </v-col>
          <v-col offset-md="2" offset="1" cols="3" md="2">
            <v-row>
              <div class="my-6 footerCap">Đường dẫn hữu ích</div>
            </v-row>
            <v-row>
              <v-col cols="12" class="pl-0">
                <v-div class="my-3 footerText">
                  <router-link :to="{ name: 'Home' }"> Trang chủ </router-link>
                </v-div>
              </v-col>
              <v-col cols="12" class="pl-0">
                <v-div class="my-3 footerText">
                  <router-link :to="{ name: 'nonePerfume' }">
                    Danh sách nước hoa
                  </router-link>
                </v-div>
              </v-col>
              <v-col cols="12" class="pl-0">
                <v-div class="my-3 footerText">
                  <router-link :to="{ name: 'brandList' }">
                    Các nhãn hàng
                  </router-link>
                </v-div>
              </v-col>
              <v-col cols="12" class="pl-0">
                <v-div class="my-3 footerText">
                  <router-link :to="{ name: 'scentList' }">
                    Nhóm mùi chính
                  </router-link>
                </v-div>
              </v-col>
            </v-row>
          </v-col>
          <v-col offset="0" offset-md="1" cols="4" md="3">
            <v-row>
              <div class="my-6 footerCap">Liên hệ</div>
            </v-row>
            <v-row>
              <v-col cols="12" class="pl-0">
                <v-div class="footerIcon"><v-icon>mdi-home</v-icon> </v-div>
                <v-div class="my-3 footerText">
                  174 Nguyễn Thiện Thuật, P4, Quận Tân Bình, TP HCM
                </v-div>
              </v-col>
              <v-col cols="12" class="pl-0">
                <v-div class="footerIcon"><v-icon>mdi-phone</v-icon></v-div>
                <v-div class="my-3 footerText"> 0775277809 </v-div>
              </v-col>
              <v-col cols="12" class="pl-0">
                <v-div class="footerIcon"><v-icon>mdi-mail</v-icon></v-div>
                <v-div class="my-3 footerText"> support@nuochoa303.com </v-div>
              </v-col>
              <v-col cols="12" class="pl-0">
                <v-div class="footerIcon"
                  ><v-icon>fab fa-facebook-f</v-icon></v-div
                >
                <v-div class="my-3 footerText"> nuochoa.303 </v-div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Nước hoa 303</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"]
  })
};
</script>

<style lang="scss" scoped>
.footerCap {
  text-transform: uppercase;
  font-weight: 700;
}

.footerIcon {
  display: inline-block;
  width: 25px;
}

.footerText > a {
  color: white;
  text-decoration: none;
  text-transform: capitalize;
}
</style>
