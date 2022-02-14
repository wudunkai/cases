/**
 *
 * @param callback  为传入的回调函数
 * @param prev  为初始值
 */
Array.prototype.myreduce = function (callback, accumulator) {
  let i = 0
  if (!accumulator) {
    i = 1
    accumulator = arr[0]
  }
  for (; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this)
  }
  return accumulator
}


const arr = [1, 2, 3, 4]
let arr1 = arr.myreduce(function (accumulator, currentValue, index, arr) {
  console.log(accumulator, currentValue, index, arr);
  return accumulator + currentValue
}, 22)
let arr2 = arr.reduce(function (accumulator, currentValue, index, arr) {
  console.log(accumulator, currentValue, index, arr);
  return accumulator + currentValue
}, 22)
console.log(arr1)     // 32
