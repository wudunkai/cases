// @ts-check
import { defineStore, acceptHMRUpdate } from "pinia";
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    name: "Eduardo",
    isAdmin: true,
  }),
  actions: {
    async login(user: string) {
      this.$patch({
        name: user,
      });
    },
  },
  // 开启数据缓存
  // 数据默认存在sessionStorage里，并且会以store的id作为key
  persist: {
    enabled: true,
    // strategies: [
    //   {
    //     key: "my_user",
    //     storage: localStorage,
    //     paths: ["name"],
    //   },
    // ],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
