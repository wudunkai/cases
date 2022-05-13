'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
// 创建实例过程的方法
function createInstance(defaultConfig) {
  // 实例化，创建一个上下文
  var context = new Axios(defaultConfig);
  // 平时调用的get/post等等请求，底层都市调用request方法
  // 将request方法的this指向context(上下文)，形成新的实例
  var instance = bind(Axios.prototype.request, context);

  // axios.prototype上的(get/post...)挂载到新的实例instance上，
  // 并且讲原型方法中的this指向context
  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // axios属性值挂载到新的实例instance上
  // 开发中才能使用axios.dafault/interceptors
  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}
// 实例化
// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;
// 创建独立的实例，隔离作用域
// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
