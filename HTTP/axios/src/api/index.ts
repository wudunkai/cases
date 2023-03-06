// index.js 文件

import userApi from "./user";
import httpsApi from "./https";

const api = {
  ...userApi, // 用户相关接口
  ...httpsApi, // https相关接口
};

export default api;
