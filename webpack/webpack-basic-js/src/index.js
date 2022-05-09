// 全局
// import和export必须写在顶级作用域中，否则会报错，因为是静态导入
// let a = 1
//   import $ from 'jquery'
// if( a = 1){
// } else {
//   import $ from 'webpack'
// }

// import('jquery').then(({ default: $ })=>{
//   // 执行resolve时就表示jquery导入完成了
//   $(function() {
//     $('<div></div>').html("我是index").appendTo('body')
//   })
// })

// $(function() {
//   $('<div></div>').html('我是main1').appendTo('body')
// })

// function getComponent() {
//   return import('jquery').then(({ default: $ }) => {
//     return $('<div></div>').html('main')
//   })
// }

// getComponent().then(item => {
//   item.appendTo('body')
// })

// 需求: 当用户点击按钮时  添加一个div
// $(function() {
//   $('#btn').click(function() {
//     $('<div></div>').html('我是main').appendTo('body')
//   })
// })

// window.onload = function() {
//   document.getElementById('btn').onclick = function() {
//     // 当用户点击按钮时才会执行
//     $('<div></div>').html('我是main').appendTo('body')
//   }
// }


// 懒加载
window.onload = function () {
  document.getElementById('btn').onclick = function () {
    // 当用户点击按钮时才会执行
    getComponent().then(item => {
      item.appendTo('body')
    })
  }
}

// /* webpackPrefetch: true */ 魔法注释
// 动态导入
function getComponent() {
  return import(/* webpackPrefetch: true */ 'jquery').then(({ default: $ }) => {
    return $('<div></div>').html('我是main')
  })
}

// import moment from 'moment'
// // 手动引入
// import 'moment/locale/zh-cn'
// // 设置语言
// moment.locale('zh-CN')
// console.log(moment().subtract(6, 'days').calendar())

// import vue from 'vue' // runtime-only 的 vue 包
// import Vue from 'vue/dist/vue.js' // 完整版的vuejs
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// const homeComponent = {
//   template: '<h2>我是homeaaa页面</h2>'
// }

// const newsComponent = {
//   template: '<h2>我是newsheiheihei页面</h2>'
// }

// const router = new VueRouter({
//   routes: [
//     {
//       path: '/home',
//       component: homeComponent
//     },
//     {
//       path: '/news',
//       component: newsComponent
//     }
//   ]
// })

// new Vue({
//   el: '#app',
//   data: {
//     msg: 'helloworld'
//   },
//   router
// })


// react
// import React from 'react'
// import ReactDOM from 'react-dom'

// let reactNode = React.createElement('h1', null, '我很酷的！！')
// ReactDOM.render(reactNode, document.getElementById('app'))