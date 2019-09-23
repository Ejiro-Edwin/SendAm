<template>
  <div class="login-container">
    <div class="container">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated slideInTop"
        leave-active-class="animated fadeOut"
      >
        <div class="alert alert-success" v-if="$store.state.show">
          <strong>{{successMsg}}</strong>
        </div>
      </transition>

      <div class="row justify-content-center pl-3 pr-3">
        <div class="col-md-4">
          <div class="login-wrapper">
            <div class="login-header" align="center">
              <h4>LOGIN</h4>
            </div>
            <span class="text-danger">{{error_msg}}</span>
            <v-form
              ref="form"
              class="pt-3"
              v-model="valid"
              lazy-validation
              @submit.prevent="login_account"
            >
              <div class="row">
                <div class="col-md-12">
                  <v-text-field
                    type="email"
                    :rules="emailRules"
                    v-model="email"
                    label="Email address"
                    required
                  ></v-text-field>
                </div>
                <div class="col-md-12">
                  <v-text-field
                    type="password"
                    :rules="passwordRules"
                    v-model="password"
                    label="Password"
                    required
                  ></v-text-field>
                </div>
                <small
                  class="ml-3 mt-2"
                >Minimum of 8 characters with a mix of letters, numbers & symbols</small>
              </div>
              <div class="row justify-content-center mt-1 p-3">
                <v-btn
                  class="curve w-100"
                  type="submit"
                  :disabled="!valid"
                  v-html="sign_up_btn"
                  style="background-color:#4fc7b3;"
                ></v-btn>
              </div>
              <div class="row justify-content-center mt-2">
                <div class>
                  <span>Dont have an account?
                    <router-link to="register">Click here</router-link>
                  </span>
                </div>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-3 mt-2">
        <div class="d-flex w-100 flex-row align-items-baseline footer-text">
          <div class="w-75">&copy; 2019</div>
          <div class="flex-shrink-0 pl-2 pr-2">Help</div>
          <div class="flex-shrink-0 pl-2 pr-2">Privacy</div>
          <div class="flex-shrink-0 pl-2">Terms</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authenticationService from "@/services/authenticationService.js";
import { mapState } from "vuex";

export default {
  name: "login",
  data() {
    return {
      valid: true,
      show: null,
      error: null,
      error_msg: null,
      sign_up_btn: "login in",
      email: "",
      emailRules: [
        v => !!v || "Email is required",
        v => /.+@.+/.test(v) || "Email must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "Password too weak"
      ]
    };
  },
  computed: mapState({
    successMsg: state => state.successMsg
  }),
  methods: {
    login_account: async function() {
      if (this.$refs.form.validate()) {
        this.sign_up_btn = `<span><div class="xxx"></div></span>`;
        this.valid = false;
        try {
          const response = await authenticationService.login({
            email: this.email,
            password: this.password
          });
          if (response.data.status) {
            this.$store.dispatch("setToken", response.data.token);
            this.$store.dispatch("setUser", response.data.user);
            this.$router.push({
              path: "/"
            });
          }
        } catch (error) {
          this.error_msg = error.response.data.error;
          this.valid = true;
          this.sign_up_btn = " login in";
        }
      }
    }
  }
};
</script>

<style scope>
.login-container {
  background-image: linear-gradient(
      to right bottom,
      rgba(0, 0, 0, 0.8),
      rgba(24, 99, 99, 0.8)
    ),
    url(../assets/productImage/single-project-07-img1.jpg);
  background-size: cover;
  background-position: bottom;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 7rem;
}
.login-wrapper {
  background-color: #fff !important;
  width: 100%;
  margin-top: 4.3%;
  padding: 24px 24px 36px;
  border: 1px solid gray;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0rem 0.1rem 0.5rem 0rem #999999;
}
.alert-in-enter-active {
  animation: bounce-in 8s;
  animation-delay: 4s;
  transition-delay: 3s;
}
.alert-in-leave-active {
  animation: bounce-in 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
