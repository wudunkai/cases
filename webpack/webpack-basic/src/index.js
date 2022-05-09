console.log('我是index')

// 全局
// import $ from 'jquery'


// $('body').css('backgroundColor','pink')

// console.log($)

// console.log(window)

// import { getUserInfo } from './api/http.js'

// getUserInfo().then( res =>{ 
//   console.log(res)
// }).catch( err => {
//   console.log(err)
// })

// console.log(IS_DEV, test, test2)

// import axios from 'axios'
// axios.get('/api/getUserInfo')
// .then(result => console.log(result))

// import str from './hotmodule'
// console.log(str)

// 不适用于生产环境 适用于 开发环境
// if (module.hot) {
//   module.hot.accept('./hotmodule.js', function() {
//     console.log('hotmodule.js更新了');
//     let str = require('./hotmodule.js')
//     console.log(str)
//   })
// }

// import export 静态结构 tree shaking

// 动态导入 可以在if判断是时进行导入 require

// let math =  require('./math.js')
// console.log(math.add(1,2))

// import {add} from './math'
// let a = 1 + 1 + 2 -1
// let b = 10 - 5  
// console.log(add(a,b))

// let a = 1
// let b = 2
// let c = 3
// console.log(a+b+c)
// console.log(a,b,c)

// scope hoisting
import {a,b,c} from './constant'
console.log(a+b+c)