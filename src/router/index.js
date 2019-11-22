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
    path: "/showMap", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
    name: "showMap",
    component: () => import("../views/showMap.vue")
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
  // {
  //   path: "/demo",
  //   name: "demo",
  //   redirect: {
  //     name: "showMap"
  //   },
  //   component: () => import("../views/main.vue"),
  //   children: [
  //     {
  //       path: "showMap", //以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
  //       name: "showMap",
  //       component: () => import("../views/showMap.vue")
  //     },
  //     {
  //       path: "dataScreening",
  //       name: "dataScreening",
  //       component: () => import("../views/dataScreening.vue")
  //     },
  //     {
  //       path: "rawData",
  //       name: "rawData",
  //       component: () => import("../views/rawData.vue")
  //     },
  //     {
  //       path: "insertData",
  //       name: "insertData",
  //       component: () => import("../views/insertData.vue")
  //     },
  //     {
  //       path: "queryData",
  //       name: "queryData",
  //       component: () => import("../views/queryData.vue")
  //     },
  //     {
  //       path: "statisticalAnalysis",
  //       name: "statisticalAnalysis",
  //       component: () => import("../views/statisticalAnalysis.vue")
  //     }
  //   ]
  // }
];

const router = new VueRouter({
  routes
});

export default router;
