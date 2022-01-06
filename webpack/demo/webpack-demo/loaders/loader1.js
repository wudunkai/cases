let loaderUtils = require('loader-utils')

// 其实loader 就是一个函数
// 使用loader1 将js文件中 下雨 换成 晴天
module.exports = function(source) {
  // console.log(source)
  // this.query已经废弃，最新的api是使用loaderUtils.getOptions方法来获取
  // console.log('loader1', this.query)
  // loader处理完后需要把处理的结果返回
  // return source.replace(/下雨/g, '晴天')
  // return source.replace(/下雨/g, this.query.name)
  

  let options = loaderUtils.getOptions(this)
  // console.log('我是loader1',options)
  return source.replace(/下雨/g, options.name)
}