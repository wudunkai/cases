// 其实loader 就是一个函数
// 使用loader2 将js文件中 新闻 换成 大新闻
module.exports = function(source) {
  // console.log('loader2')
  // loader处理完后需要把处理的结果返回
  return source.replace(/新闻/g, '大新闻')
}