import { createApp } from "vue";
import "./qiankun/index";
import router from "./router";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(router).mount("#app");
