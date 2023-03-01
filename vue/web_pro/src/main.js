import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Field, CellGroup } from 'vant';

import 'vant/lib/index.css';
import "./assets/css/main.css";
import "element-plus/theme-chalk/src/message.scss";
import useTable from "./utils/useTable/index";
const app = createApp(App);
app.use(router).use(Field).use(CellGroup).use(useTable).mount("#app");
