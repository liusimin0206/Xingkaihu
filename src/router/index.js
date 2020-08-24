import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/showMap",
    name: "showMap",
    component: () => import("../views/showMap/index.vue")
  },
  {
    path: "/dataScreening",
    name: "dataScreening",
    component: () => import("../views/dataScreening.vue")
  },
  {
    path: "/rawData",
    name: "rawData",
    component: () => import("../views/rawData.vue")
  },
  {
    path: "/insertData",
    name: "insertData",
    component: () => import("../views/insertData.vue")
  },
  {
    path: "/queryData",
    name: "queryData",
    component: () => import("../views/queryData.vue")
  },
  {
    path: "/statisticalAnalysis",
    name: "statisticalAnalysis",
    component: () => import("../views/statisticalAnalysis.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
