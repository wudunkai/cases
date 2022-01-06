import { createApp } from "vue";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-persistedstate-plugin";
import App from "./App.vue";

const app = createApp(App);
const store = createPinia();
console.log(store);

store.use(createPersistedState());

app.use(store).mount("#app");
