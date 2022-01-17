// const user = { name: 'day' }
// const newUser = user
// console.log(user === newUser)

// newUser.name = 'zhang';
// console.log(user === newUser)

// user.name = null

// console.log(newUser)

// console.log(name)
// var name = 'day'
// console.log(age)
// let age = 18

// console.log(getUser)
// function getUser() { }
// console.log(getUser)

// function A() {
//   this.name = 'zhang'
// }
// A.prototype.age = 18;
// function B() { }
// B.prototype = new A()
// const b1 = new B()
// const b2 = new B()
// b1.name = 'yang'
// console.log(b1.name)
// console.log(b2.name)
// console.log(b2.age)


// const data = [
//   { name: 'wu', id: 1 },
//   { name: 'wu2', id: 2 },
//   { name: 'wu3', id: 3, parentId: 1 },
//   { name: 'wu4', id: 4, parentId: 1 },
// ]

// const getData = (data, id, result) => {
//   for (item of data) {
//     if (item.parentId == id) {
//       result.push(item)
//     }
//   }
//   for (i of result) {
//     if (!i.parentId) {
//       i.children = []
//       getData(data, i.id, i.children)
//     }
//   }
//   // console.log(result);
//   return result
// }
// const arr = getData(data, null, [])


// let arr = data.reduce((init, nextVal) => {
//   if (!nextVal.parentId) {
//     nextVal.children = []
//     init.push(nextVal);
//   } else {
//     for (item of init) {
//       if (item.id == nextVal.parentId) {
//         item.children.push(nextVal)
//       }
//     }
//   }
//   return init
// }, []);

// console.log(arr);


// const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
// const arr2 = [{ id: 1 }, { id: 4 }, { id: 5 }, { id: 6 }];

// // //var arr2 = [{ id: 1, name: '小明' }, { id: 2, name: '卢本伟' }, { id: 3, name: 'PDD' }, { id: 4, name: '大司马' }]
// // //var arr1 = [{ id: 1, car: '奔驰' }, { id: 2, car: '宝马' }, { id: 3, car: '劳斯' }, { id: 4, car: '大众' }]
// // // 方法如下
// const combined = arr2.reduce((acc, cur) => {
//   console.log(acc, cur);
//   // const target = acc.findIndex(e => e.id === cur.id);
//   // if (target !== -1) {
//   //   acc.splice(target, 1);
//   // } else {
//   //   acc.push(cur);
//   // }
//   // return acc;
// }, arr1);
// // console.log(combined)


// 不耍帅⽅式，先进先执⾏,类似队列
const composeV1 = (...funcList) => {
  return (data) => funcList.reduce((tmpResult, func) => {
    return func(tmpResult)
  }, data)
}
// 耍帅⽅式，后进先执⾏，类似堆栈
const composeV2 = (...funcList) => {
  return funcList.reduce(function (funcA, funcB) {
    // console.log(funcA, funcB);
    return function (...args) {
      console.log(funcA, funcB);
      return funcA(funcB(...args))
    }
  })
}
// ⽅法1：记录⽇志（⽰例）
const log = function (data) {
  console.log(data)
  return data
}
// ⽅法2：序列化（⽰例）
const serialize = function (data) {
  return JSON.stringify(data)
}
// ⽅法3：加密（⽰例）
const encrypt = function (data) {
  return [].map.call(data, (v) => String.fromCharCode(v.charCodeAt(0) + 3259)).join('')
}
// const resultV1 = composeV1(
//   log,
//   serialize,
//   encrypt,
//   log
// )('simonghuang')
// console.log('resultV1:', resultV1)
const resultV2 = composeV2(
  log,
  encrypt,
  serialize,
  log
)('simonghuang')
console.log('resultV2:', resultV2)
