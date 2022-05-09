// axios.js 文件
import axios from "axios";
import { addPending, removePending } from "./cancel";
// api 基础路径（如无可以为空）
const basePath = "/api";
// 创建axios实例
const http = axios.create({
  // 请求头配置 token
  headers: {
    token: localStorage.getItem("token") || "",
  },
  // 基础路径
  baseURL: basePath,
  // 请求连接超时设置
  timeout: 2 * 60 * 1000,
  // 表示跨域请求时是否需要使用凭证，开启后，后端服务器要设置允许开启
  withCredentials: true,
});
// request 请求拦截器
http.interceptors.request.use(
  (config) => {
    // 发起请求时，重新获取最新的token，这一步有时很重要，因为创建 axios 实例的时候，
    // 获取到的 token 未必是有效的，或说未必能获取到
    const token = localStorage.getItem("token");
    // 特殊配置：设置下载获取 excel 接口的返回值为 blob。这在异步下载文件时有时会显得很有用。
    if (config.url === "/api/excel/download") {
      config.responseType = "blob";
    }
    // 特殊配置：登录接口，将 请求的头的 token 设置为空字符串
    if (config.url === "/author/login") {
      config.headers["token"] = "";
    } else {
      config.headers["token"] = token || "";
    }
    removePending(config);
    config.headers.cancel && addPending(config);
    return config;
  },
  (error) => {
    console.warn(error);
    return Promise.reject(error);
  }
);

//中间 适配器，判断是浏览器端还是 node 端，执行不同的方法

// 定时器，配合后面的禁止短时间内多次弹出错误提示，但这种禁止的合理性未明
// let timeout = null
// response 响应拦截器
http.interceptors.response.use(
  (response) => {
    const res = response.data;
    removePending(response.config);
    // 特殊配置：code为 -10086，表示资源不存在，跳转到提示页（404）
    if (res.code === -10086) {
      return res;
    } else {
      return res;
    }
  },
  (error) => {
    /* // 特殊处理：拦截更改提示信息
    if (error.message.indexOf('timeout') > -1) {
      error.message = '请求超时'
    }
    if (error.message.indexOf('Network') > -1) {
      error.message = '网络错误'
    } */
    /* // 特殊处理：禁止短时间内多次弹出提示，遗憾的是效果不理想，后续测验优化
    // 1000毫秒内最多只展示一次报错信息
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }, 1000) */
    error.config && removePending(error.config);
    return Promise.reject(error);
  }
);
/**
 * post 请求
 * @param url 接口路径
 * @param params 接口参数
 * @returns {Promise<unknown>}
 */
function post(url: string, params = {}, cancel?: boolean) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: url,
      data: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        cancel: cancel,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * get 请求
 * @param url 接口路径
 * @param param 接口参数
 * @returns {Promise<unknown>}
 */
function get(url: string, params = {}, cancel?: boolean) {
  return new Promise((resolve, reject) => {
    http({
      method: "get",
      url: url,
      data: params,
      headers: {
        cancel: cancel,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * put 请求
 * @param url 接口路径
 * @param params 接口参数
 * @returns {Promise<unknown>}
 */
function put(url: string, params = {}, cancel?: boolean) {
  return new Promise((resolve, reject) => {
    http({
      method: "put",
      url: url,
      data: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        cancel: cancel,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * delete 请求
 * @param url 接口路径
 * @param params 接口参数
 * @returns {Promise<unknown>}
 */
function deleteJson(url: string, params = {}, cancel?: boolean) {
  return new Promise((resolve, reject) => {
    http({
      method: "delete",
      url: url,
      data: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        cancel: cancel,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * multipart post 请求 常用于文件上传
 * @param url 接口路径
 * @param params 接口参数
 * @returns {Promise<unknown>}
 */
function postMultipart(url: string, params = {}, cancel?: boolean) {
  return new Promise((resolve, reject) => {
    http({
      method: "post",
      url: url,
      data: params,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
        cancel: cancel,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { basePath, http, post, get, put, deleteJson, postMultipart };
