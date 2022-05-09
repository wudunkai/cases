class MyPromise {
  constructor(executor) {
    // 初始化值
    this.initValue()
    // 初始化this指向
    this.initBind()
    try {
      // 执行传进来的函数
      executor(this.resolve, this.reject)
    } catch (e) {
      // 捕捉到错误直接执行reject
      this.reject(e)
    }
  }
  initBind() {
    // 初始化this
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }
  initValue() {
    // 初始化值
    this.PromiseResult = null // 终值
    this.PromiseState = 'pending' // 状态
    this.onFulfilledCallbacks = [] // 保存成功回调
    this.onRejectedCallbacks = [] // 保存失败回调
  }
  resolve(value) {
    // state是不可变的
    if (this.PromiseState !== 'pending') return
    // 如果执行resolve，状态变为fulfilled
    this.PromiseState = 'fulfilled'
    // 终值为传进来的值
    this.PromiseResult = value
    // 执行保存的成功回调
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }
  reject(reason) {
    // state是不可变的
    if (this.PromiseState !== 'pending') return
    // 如果执行reject，状态变为rejected
    this.PromiseState = 'rejected'
    // 终值为传进来的值
    this.PromiseResult = reason
    // 执行保存的成功回调
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }
  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected

    // 参数校验，确保一定是函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }
    // var thenPromise = new MyPromise((resolve, reject) => {
    return new MyPromise((resolve, reject) => {
      const resolvePromise = cb => {
        try {
          const x = cb(this.PromiseResult)
          // if (x === thenPromise) {
          //   throw new Error('不能返回自身')
          // }
          if (x instanceof MyPromise) {
            // 如果返回值是Promise
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            // 谁知道返回的promise是失败成功？只有then知道
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (err) {
          reject(err)
          throw new Error(err)
        }
      }
      if (this.PromiseState === 'fulfilled') {
        // 如果当前为成功状态，执行第一个回调
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === 'rejected') {
        // 如果当前为失败状态，执行第二个回调
        resolvePromise(onRejected)
      } else if (this.PromiseState === 'pending') {
        // 如果状态为待定状态，暂时保存两个回调
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })
    // console.log(thenPromise);
    // return thenPromise
  }
  static all(promises) {
    const result = []
    let count = 0
    // 接收一个promise数组，数组中如有非promise项，则此项目做成功
    return new MyPromise((resolve, reject) => {
      const addData = (index, value) => {
        result[index] = value
        count++
        if (count === promises.length) resolve(result)
      }
      // 如果所有Promise都成功，则返回成功结果数组
      // 如果有一个Promise失败，则返回这个失败结果
      promises.forEach((promise, index) => {
        // console.log(promise);
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData(index, res)
          }, err => reject(err))
        } else {
          addData(index, promise)
        }
      })
    })
  }
  static race(promises) {
    // 接收一个promise数组，数组中如有非promise项，则此项当做成功
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        // 那个promise最快得到结果，就返回那个结果，无论成功失败
        if (promise instanceof MyPromise) {
          promise.then(res => {
            resolve(res)
          }, err => {
            reject(err)
          })
        } else {
          resolve(promise)
        }
      })
    })
  }
  static allSettled(promises) {
    // 接收一个promise数组，数组中如果非promise项，则此项当做成功
    // 把每一个promise的结果，集合成数组，返回
    return new Promise((resolve, reject) => {
      const res = []
      let count = 0
      const addData = (status, value, i) => {
        res[i] = {
          status,
          value
        }
        count++
        if (count === promises.length) {
          resolve(res)
        }
      }
      promises.forEach((promise, i) => {
        if (promise instanceof MyPromise) {
          promise.then(res => {
            addData('fulfilled', res, i)
          }, err => {
            addData('rejected', err, i)
          })
        } else {
          addData('fulfilled', promise, i)
        }
      })
    })
  }
  static any(promises) {
    return new Promise((resolve, reject) => {
      let count = 0
      // 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
      promises.forEach((promise) => {
        // 如果有一个Promise成功，则返回这个成功结果
        promise.then(val => {
          resolve(val)
        }, err => {
          count++
          // 如果所有Promise都失败，则报错
          if (count === promises.length) {
            reject(new AggregateError('All promises were rejected'))
          }
        })
      })
    })
  }
}

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {

//     resolve(100) // 输出 状态：失败 值：300
//   }, 1000);
//   // reject(100) // 输出 状态：成功 值：200
//   // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
// }).then(res => new MyPromise((resolve, reject) => setTimeout(() => {
//   reject(2 * res)
// }, 100)
// ), err => new MyPromise((resolve, reject) => resolve(3 * res)))
//   .then(res => console.log('成功', res), err => console.log('失败', err))

// new MyPromise((resolve, reject) => {
//   reject(100) // 输出 状态：成功 值： 200
//   // reject(100) // 输出 状态：失败 值：300
// }).then(res => 2 * res, err => 3 * err)
//   .then(res => console.log('成功', res), err => console.log('失败', err))

// let promise1 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve(100) // 输出 状态：失败 值：300
//   }, 1000);
//   // reject(100) // 输出 状态：成功 值：200
//   // 这里可没搞反哦。真的搞懂了，就知道了为啥这里是反的
// })

// let promise2 = new MyPromise((resolve, reject) => {
//   resolve(200) // 输出 状态：成功 值： 200
//   // reject(100) // 输出 状态：失败 值：300
// })
// let promise3 = new MyPromise((resolve, reject) => {
//   reject(300) // 输出 状态：成功 值： 200
//   // reject(100) // 输出 状态：失败 值：300
// })
// // all
// MyPromise.all([promise1, promise2, promise3]).then(posts => {
//   console.log("all:", posts);
// })
// // race
// MyPromise.race([promise1, promise2]).then(posts => {
//   console.log("race:", posts);
// })
// // allSettled
// MyPromise.allSettled([promise1, promise2]).then(posts => {
//   console.log("allSettled:", posts);
// })
// // any
// MyPromise.any([promise1, promise2, promise3]).then(posts => {
//   console.log("any:", posts);
// })