import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/Home",
      name: "HomeView",
      component: () => import("@/views/HomeView.vue"),
    },
  ],
});

export default router;
