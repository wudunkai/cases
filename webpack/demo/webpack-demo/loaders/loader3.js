// 其实loader 就是一个函数
// 使用loader3 将js文件中 新闻 换成 大新闻
module.exports = function(source) {
  // console.log('loader3')
  // loader处理完后需要把处理的结果返回
  return source.replace(/大新闻/g, '---')
}