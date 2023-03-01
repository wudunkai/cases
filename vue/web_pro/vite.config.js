import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import {
  createStyleImportPlugin,
  VxeTableResolve,
} from "vite-plugin-style-import";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_APP_REQUEST, VITE_APP_BASEURL } = loadEnv(
    mode,
    fileURLToPath(new URL("./viteEnv", import.meta.url)),
  );
  return defineConfig({
    envDir: "./viteEnv",
    plugins: [
      vue(),
      createStyleImportPlugin({
        resolves: [VxeTableResolve()],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      hmr: { overlay: false },
      port: 8080, // 设置服务启动端口号
      open: false, // 设置服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        [VITE_APP_BASEURL]: {
          target: VITE_APP_REQUEST,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  });
};
