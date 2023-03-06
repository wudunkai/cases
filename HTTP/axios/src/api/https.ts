// api文件夹中的 user.js
// 用户模块相关api
import { http, basePath, post, get, put, deleteJson } from "./axios";

const userApi = {
  // get方法
  get: () => get("/https/get"),
  getData: (params: any) => get("/https/get", params),
  post: ({ params, data, headers }: any) =>
    post({ url: "/https/post", params, data, headers }),
  put: ({ params, data, headers }: any) =>
    put({ url: "/https/put", params, data, headers }),
};

export default userApi;
