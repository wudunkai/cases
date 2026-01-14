import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      dts: "types/auto-import.d.ts",
      dirs: ["src/views/**"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    proxy: (() => {
      return {
        // 所有以 /api 开头的请求都会被代理
        "/base": {
          target: "http://223.4.64.87:9081/",
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(new RegExp(`^/base`), '')
          // 可选：在需要WebSocket时启用 ws: true
          // ws: true
        },
      };
    })(),
  },
});
