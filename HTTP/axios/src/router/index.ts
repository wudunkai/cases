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
      path: "/Https",
      name: "Https",
      component: () => import("@/views/Https.vue"),
    },
  ],
});

export default router;
