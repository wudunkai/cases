const { response } = require("express");

// 默认配置
function Axios(config) {
  this.default = config;
  this.interceptors = {
    Request,
    Response,
  };
}

Axios.prototype.request = function request(config) {
  // 浏览器判断
  let dispatchRequest;
  let chain = [dispatchRequest];
  let promise = Promise.resolve(config);
  // 拦截器
  this.interceptors.Request.forEach(request => {
    chain.unshift(request.fulled, request.rejected)
  });
  // 响应器
  this.interceptors.Response.forEach(response => {
    chain.push(response.fulled, response.rejected)
  });
  // 链式处理

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
  return promise;
}

post get delete put
Axios.prototype.post = function request(config, data, url) {
  return this.request({
    data,
    url,
    config
  })
}
['get', 'delete'].forEach(item => {
  Axios.prototype[item] = function request(config, url) {
    return this.request({
      url,
      config
    })
  }
})

Axios.prototype.get = function request(config, url) {
  return this.request({
    url,
    config
  })
}

['post', 'put'].forEach(item => {
  Axios.prototype[item] = function request(config, url) {
    return this.request({
      url,
      config,
      data,
    })
  }
})
