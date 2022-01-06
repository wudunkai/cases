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
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
