'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  // 配置
  this.defaults = instanceConfig;
  // 拦截器实例
  this.interceptors = {
    // 拦截器
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
// 伪代码
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  // 为了支持 request(url, {...}), request({url, ...})
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }
  // 配置优先级：调用方法的配置 > 实例化axios的配置 > 默认配置
  // 例子： 类似axios.get(url,{}) > axios.create(url,{}) > 内部默认配置
  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  // 形成一个 promise 链条的数组 // 目前不知道为什么要加个undefined
  var chain = [dispatchRequest, undefined];
  // 传入配置
  var promise = Promise.resolve(config);
  // 请求
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    console.log(interceptor, '请求');
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  // 响应
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    console.log(interceptor, '响应');
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });
  // 形成promise链条调用  
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }
  // 通过对数组的遍历，形成一条异步的 promise 调用链，是 axios 对 promise 的巧妙运用
  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;
