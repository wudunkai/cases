import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.css";
const app = createApp(App);
// 全局配置axios
// 导入共用 api 文件
import api from "./api";
app.config.globalProperties.$api = api;

app.mount("#app");
