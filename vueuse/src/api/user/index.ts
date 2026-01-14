import { useApi } from "../utils";

export const useUserList = () => {
  return useApi<User[]>("/basePasswordConfig/getLoginConfig", {
    method: "POST",
    immediate: false
  });
};
