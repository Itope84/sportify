import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import axios from "axios";

window.axios = axios;

axios.defaults.headers.common["X-Auth-Token"] =
  "5ee8579e468f4e5aab44735013fc020e";
axios.defaults.baseURL = "http://api.football-data.org/v2";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
