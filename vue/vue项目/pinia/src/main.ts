import "amfe-flexible";
import { createApp } from "vue";
import { createPinia } from "pinia";
// import { createPersistedState } from "pinia-persistedstate-plugin";
// import piniaPluginPersist from "pinia-plugin-persist";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

import router from "./router";

const app = createApp(App);
const store = createPinia();

store.use(piniaPluginPersistedState);

app.use(ElementPlus).use(router).use(store).mount("#app");
