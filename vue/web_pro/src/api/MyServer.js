import request from "./request";
import { judgeDataType, isEmpty, clone, isArray } from "@/utils/methods";
import { stringify } from "qs";

/**
 * 设置加载状态
 * @param {Object, Array} items 需要设置加载状态的数据
 * @param {Boolean} loading 加载状态, true或false
 * @return void
 */
const setLoading = (items, loading) => {
  if (isArray(items)) {
    items.forEach((item) => {
      item.loading = loading;
    });
  }

  if (judgeDataType(items) === "object" && !isEmpty(items))
    items.loading = loading;
};

class MyServer {
  constructor() {
    this.request = request;
  }
  /**
   * 设置请求
   * @param {String} name 接口模块名称
   * @param {Object} api 接口模块配置
   * @return void
   */
  setRequest(name, api) {
    this[name] = {};
    Object.entries(api).forEach(([apiName, req]) => {
      this[name][apiName] = this.sendMessage.bind(this, name, apiName, req);
    });
  }
  /**
   * 发送请求
   * @param {String} moduleName 接口模块名称
   * @param {String} name 接口名称
   * @param {Object} req 接口请求参数
   * @param {Object} options 扩展配置
   * @return {Promise} 发送请求经过自定义处理后的结果
   */
  sendMessage(moduleName, name, req, options) {
    const config = options || {};
    const reqMsg = clone(req);
    const params = reqMsg?.data ?? config?.data;
    const btn = config?.btn;
    const vm = config?.vm;
    const bindField = config.bindField;

    isEmpty(reqMsg.url) && (reqMsg.url = config.url);
    isEmpty(reqMsg.method) && (reqMsg.method = config.method);
    setLoading(btn, true);
    reqMsg[reqMsg.method === "get" ? "params" : "data"] = config?.qs
      ? stringify(params)
      : params;
    /**
     * 请求成功前处理
     * @param {Any} data 请求返回的数据
     * @return {Any} 请求返回的数据
     */
    const BeforeSuccess = isEmpty(config.success)
      ? function (data) {
        return data;
      }
      : config.success;
    /**
     * 请求成功处理
     * @param {Any} data 请求返回的数据
     * @return {Any} 请求返回的数据
     */
    const Success = function (data) {
      if (!isEmpty(vm) && !isEmpty(bindField)) vm[bindField] = clone(data);

      setLoading(btn, false);
      return data;
    };

    return this.request(reqMsg).then(BeforeSuccess).then(Success);
  }
}

export default new MyServer();
