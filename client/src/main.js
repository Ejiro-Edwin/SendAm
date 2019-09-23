import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import bootstrapvue from 'bootstrap-vue'
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import 'vuetify/dist/vuetify.css'
import 'vuetify/dist/vuetify.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/esm/components/modal/modal'
import 'bootstrap-vue/esm/directives/modal/modal'
import './assets/animate.css'

Vue.config.productionTip = false;

Vue.use(bootstrapvue)

Vue.component("icon", Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
