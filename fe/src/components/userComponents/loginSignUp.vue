<template>
  <v-container>
    <v-row align-content="center" justify="center" class="mb-2">
      <div class="loginTitle">{{ title[step] }}</div>
    </v-row>
    <v-row class="d-flex align-center justify-center">
      <v-card
        :color="$store.getters['loginsignupError/haveError'] ? 'red' : 'green'"
        v-if="
          $store.getters['loginsignupError/haveError'] ||
            $store.getters['loginsignupError/haveSignupSuccess']
        "
        light
        elevation="12"
        class="py-1 px-5 mb-5"
      >
        <span style="color: white">{{
          $store.getters["loginsignupError/getMessage"]
        }}</span>
      </v-card>
    </v-row>
    <v-container fluid>
      <ValidationObserver slim ref="observer" v-slot="{ invalid }">
        <v-row>
          <v-col cols="12">
            <v-card light color="#f4f5f7" elevation="12">
              <v-overlay
                absolute
                :value="$store.getters['navbar/getIsSubmitting']"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-overlay>
              <v-container fluid class="px-5">
                <v-window v-model="step">
                  <v-window-item :value="0" class="pt-6">
                    <v-form>
                      <ValidationProvider
                        name="Tên đăng nhập"
                        rules="required|min:6|alpha_dash"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          light
                          solo
                          prepend-inner-icon="mdi-account"
                          v-model.trim="user.username"
                          :error-count="errors.length"
                          :error-messages="errors"
                          label="Tên đăng nhập"
                          hint="Ít nhất 8 ký tự bao gồm chữ hoa, chữ thường, số, - _"
                          required
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Mật khẩu"
                        rules="required|min:8|upperCase|lowerCase|containNumber"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          light
                          solo
                          prepend-inner-icon="mdi-key-variant"
                          v-model.trim="user.password"
                          :error-count="errors.length"
                          :error-messages="errors"
                          :append-icon="
                            showPassword ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          label="Mật khẩu"
                          hint="Ít nhất 8 ký tự bao gồm chữ hoa, chữ thường và số"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                        ></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider
                        name="Nhập lại mật khẩu"
                        rules="required|password:@Mật khẩu"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          light
                          solo
                          prepend-inner-icon="mdi-key-variant"
                          v-model.trim="user.passwordConfirm"
                          :error-count="errors.length"
                          :error-messages="errors"
                          :append-icon="
                            showPassword1 ? 'mdi-eye' : 'mdi-eye-off'
                          "
                          label="Nhập lại mật khẩu"
                          hint="Giống với mật khẩu ở trên"
                          :type="showPassword1 ? 'text' : 'password'"
                          @click:append="showPassword1 = !showPassword1"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-form>
                  </v-window-item>
                  <v-window-item :value="1" class="pt-6">
                    <v-form>
                      <v-text-field
                        solo
                        prepend-inner-icon="mdi-account"
                        light
                        v-model.trim="userLogin.username"
                        label="Tên đăng nhập"
                        required
                      ></v-text-field>
                      <v-text-field
                        solo
                        prepend-inner-icon="mdi-key"
                        light
                        v-model.trim="userLogin.password"
                        :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                        label="Mật khẩu"
                        :type="showPassword1 ? 'text' : 'password'"
                        @click:append="showPassword1 = !showPassword1"
                      ></v-text-field>
                    </v-form>
                  </v-window-item>
                </v-window>
              </v-container>
              <v-row>
                <v-col cols="12">
                  <v-tooltip
                    :disabled="!invalid || step == 1"
                    open-delay="300"
                    color="red"
                    top
                  >
                    <template v-slot:activator="{ attrs, on }">
                      <div v-on="on" style="display: inline-block; width: 100%">
                        <v-btn
                          v-bind="attrs"
                          :disabled="invalid && step == 0"
                          block
                          text
                          color="grey darken-1"
                          @click="closeModal()"
                          >{{ title[step] }}</v-btn
                        >
                      </div>
                    </template>
                    <span>Thông tin tài khoản chưa hợp lệ</span>
                  </v-tooltip>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12">
                  <v-btn
                    block
                    text
                    color="grey darken-1"
                    @click="changeView()"
                    >{{ buttonText[step] }}</v-btn
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </ValidationObserver>
    </v-container>
  </v-container>
</template>

<style lang="scss">
@import "../../../node_modules/rfs/scss.scss";

.loginTitle {
  @include font-size(3.75rem);
  color: whitesmoke;
  font-family: oswald;
  text-transform: uppercase;
  text-align: center;
}
</style>

<script>
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, min, alpha_dash } from "vee-validate/dist/rules";
import { userService } from "../../services/user.service.js";

extend("required", {
  ...required,
  message: "{_field_} không được để trống"
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Nhập lại mật khẩu không đúng"
});

extend("upperCase", {
  validate(value) {
    return /[A-Z]/.test(value);
  },
  message: "{_field_} phải có 1 ký tự in hoa"
});

extend("lowerCase", {
  validate(value) {
    return /[a-z]/.test(value);
  },
  message: "{_field_} phải có 1 ký tự in thường"
});

extend("containNumber", {
  validate(value) {
    return /[0-9]/.test(value);
  },
  message: "{_field_} phải có 1 chữ số"
});

extend("min", {
  ...min,
  message: "{_field_} phải có ít nhất {length} ký tự"
});

extend("alpha_dash", {
  ...alpha_dash,
  message: "{_field_} chỉ bao gồm chữ cái, số, dấu gạch ngang và dấu gạch dưới"
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    user: {
      username: "",
      password: "",
      passwordConfirm: ""
    },
    userLogin: {
      username: "",
      password: ""
    },
    isValid: true,
    showPassword: false,
    showPassword1: false,
    title: ["Đăng ký", "Đăng nhập"],
    buttonText: ["Đã có tài khoản? Đăng nhập!", "Chưa có tài khoản? Đăng ký!"]
  }),
  methods: {
    closeModal() {
      if (this.step == 1) {
        userService.login(this.userLogin.username, this.userLogin.password);
        setTimeout(function() {
          this.$store.dispatch("navbar/setReloadViewKey");
        }, 2000);
      } else if (this.step == 0) {
        userService.signup(this.user.username, this.user.password);
        setTimeout(function() {
          this.$store.dispatch("navbar/setReloadViewKey");
        }, 2000);
      }
    },
    changeView() {
      this.step++;
      this.$store.dispatch("loginsignupError/noError");
      this.user.username = "";
      this.user.password = "";
      this.user.passwordConfirm = "";
      this.userLogin.username = "";
      this.userLogin.password = "";
      this.$refs.observer.reset();
    }
  },
  computed: {
    step: {
      get() {
        return this.$store.getters["navbar/getForm"];
      },
      set(newValue) {
        return this.$store.dispatch("navbar/setFormLoginSignup", newValue);
      }
    }
  }
};
</script>
