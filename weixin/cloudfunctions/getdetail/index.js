// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
//1:引入request-promise
var rp = require("request-promise")
exports.main = async (event, context) => {
  //2:发送请求豆瓣 14：43
  var url = `http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })
}