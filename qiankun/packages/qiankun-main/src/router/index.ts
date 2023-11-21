import { createRouter, createWebHashHistory } from "vue-router";

const history = createWebHashHistory();
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/micro/:name",
    name: "microApp",
    component: () => import("@/views/microApp.vue"),
  },
];
const router = createRouter({
  history,
  routes,
});

// 全局前置导航钩子
router.beforeEach((to, from, next) => {
  console.log(to, from);
  next();
});

export default router;
