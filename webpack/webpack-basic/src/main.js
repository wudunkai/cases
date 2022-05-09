// commonjs规范，在浏览器中不支持
// let a =  require('./a.js')
import a from './a.js'

import './css/index.css'
import './css/b.css'

import './less/index.less'
import './scss/index.scss'

// 引入字体文件
import 'bootstrap/dist/css/bootstrap.css'

console.log(a)
console.log('eqwewqe')
console.log("在线测试？？？？？？？？")
console.log("在线测试？？？？？？？？？？？？？？？")

window.onload = function(){
  document.querySelector('ul').style.listStyle = 'none'
  document.querySelector('li').style.backgroundColor = 'yellow'
}

// setTimeout(function() {
//   console.log('function setTimeout')
// }, 1000);

// setTimeout(() => {
//   console.log('es6 setTimeout')
// }, 1000);

// es6提供了class关键字 是 原型的语法糖
// class Person {
//   constructor (name){
//     this.name = name
//   }
// }

// let p = new Person('class')
// console.log(p)

// class Dog {
//   // 创建Dog对象时默认的name为大黄
//   name = '大黄'
//   static color = 'yellow'
// }

// let d = new Dog()
// console.dir(d)
// console.dir(Dog)

// function *fn(){
//   yield 1
//   yield 2
//   return 3
// }

// let newFn = fn()
// console.log(newFn.next()) //1
// console.log(newFn.next()) //2
// console.log(newFn.next()) //3
// console.log(newFn.next()) //undefined

let arr = []
// arr.forEach()
// arr.some()
// arr.reduce()
arr.includes()

// 如果需要使用ES6/7中对象原型提供的新方法，
// babel默认情况无法转换，即使用了`transform-runtime`的插件也不支持转换原型上的方法
import '@babel/polyfill'

// String.prototype.indexOf
let str = '123'
// JS是一门动态语言, 在代码执行时可以随时为对象添加属性或方法
// babel在看到对象调用方法时默认不会进行转换
// includes这样的新方法, 默认不会转换
console.log(str.includes('2'))