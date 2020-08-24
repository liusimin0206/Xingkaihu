import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import "./assets/css/globe.css";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";

Vue.prototype.$L = leaflet;
window.L = leaflet;

Vue.prototype.$http = axios;
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: "data-source"
  }
});

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
