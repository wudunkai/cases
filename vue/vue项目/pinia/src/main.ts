import "amfe-flexible";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import { createPersistedState } from "pinia-persistedstate-plugin";
import piniaPluginPersist from "pinia-plugin-persist";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

const app = createApp(App);
const store = createPinia();

store.use(piniaPluginPersist);

app.use(ElementPlus).use(store).mount("#app");
