import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import qiankun from "vite-plugin-qiankun";

// https://vitejs.dev/config/
export default defineConfig({
  // base: DEV ? "/" : "/main/microApps/vue3", // 部署时此路径应与主应用注册的entry需保持一致
  base: "/", // 部署时此路径应与主应用注册的entry需保持一致
  plugins: [
    vue(),
    qiankun("vue3", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 7001,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
