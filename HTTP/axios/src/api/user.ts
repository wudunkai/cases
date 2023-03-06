// api文件夹中的 user.js
// 用户模块相关api
import { http, basePath, post, get, put, deleteJson } from "./axios";

const userApi = {
  // 登录
  login: (p = {}) => post({ url: "/login", data: p }),
  // 退出
  logout: () => get("/logout"),
  // 获取列表
  getList: (p = {}, cancel: boolean) => post({ url: "/list", data: p, cancel }),
};

export default userApi;
