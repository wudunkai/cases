import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import qiankun from "vite-plugin-qiankun";
// https://vitejs.dev/config/
export default defineConfig({
  // base: DEV ? "/" : "/main/microApps/react", // 部署时此路径应与主应用注册的entry需保持一致
  base: "/", // 部署时此路径应与主应用注册的entry需保持一致
  plugins: [
    // 在开发模式下需要把react()关掉
    // https://github.com/umijs/qiankun/issues/1257
    // react({
    //   babel: {
    //     babelrc: false,
    //     // 支持解析装饰器【结合 qiankunPlugin 处理开发环境热更新问题】
    //     plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
    //   },
    // }),
    qiankun("react", {
      useDevMode: true,
    }),
  ],
  server: {
    port: 7002,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
