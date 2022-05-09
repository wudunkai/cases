// api文件夹中的 user.js
// 用户模块相关api
import {
  http,
  basePath,
  post,
  get,
  put,
  deleteJson,
  postMultipart,
} from "./axios";

const userApi = {
  // 登录
  login: (p = {}) => post("/login", p),
  // 退出
  logout: () => get("/logout"),
  // 获取列表
  getList: (p = {}, cancel: boolean) => post("/list", p, cancel),
};

export default userApi;
