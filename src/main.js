import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

import "./assets/css/globe.css";

Vue.prototype.$http = axios;
Vue.use(VueAxios, axios);

Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
