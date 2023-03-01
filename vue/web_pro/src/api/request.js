import axios from "axios";
import Message from "@/components/Message/Message";

const requestUrl = []; // 请求中的url

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 6000000, // 请求超时时间2
});
// 请求401次数

let unTokenTimes = 0;
// request拦截器

service.interceptors.request.use(
  (config) => {
    const getToken = sessionStorage.getItem("Token");
    if (getToken) {
      config.headers["Authorization"] = "Bearer" + getToken;
      config.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";
    }
    if (requestUrl.includes(config.url)) return Promise.reject("请求重复");

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// response拦截器
service.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.responseType === "blob") return data;
    if (data?.code === 0) return data.model;
    Message.error(data.msg);
    return Promise.reject(data);
  },
  (error) => {
    const { response } = error;
    if (response && response.status) {
      const { status: code } = response;
      const codeMessage = {
        400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
        401: "登录超时，请重新登录。",
        403: "账号已在其它平台登录。",
        404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
        406: "请求的格式不可得。",
        410: "请求的资源被永久删除，且不会再得到的。",
        422: "当创建一个对象时，发生一个验证错误。",
        500: "服务器发生错误，请检查服务器。",
        502: "网关错误。",
        503: "服务不可用，服务器暂时过载或维护。",
        504: "网关超时。",
      };
      let message = codeMessage[code];
      !message && (message = "网络错误，请稍后重试");
      if (unTokenTimes < 2 && [401, 403].includes(code)) {
        unTokenTimes++;
        Message({
          message,
          type: "error",
          duration: 2000,
          showClose: true,
          offset: window.innerHeight / 2,
          onClose() {
            // store.dispatch("LogOut").then(() => {
            //   location.reload();
            // });
          },
        });
      } else Message.error(message);
    } else if (error.message) {
      let errMessage = error.message;
      if (error.response.data.message) errMessage = error.response.data.message;
      Message({
        message: errMessage,
        type: "error",
        duration: 3 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

export default service;
