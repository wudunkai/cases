'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  // fns: 一个数组，包含一个或多个方法转换器方法
  utils.forEach(fns, function transform(fn) {
    // 传入 data 和 headers 参数进行加
    data = fn(data, headers);
  });

  return data;
};
