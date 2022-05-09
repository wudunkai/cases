1. promise 的原理
其主要使用了设计模式中的观察者模式：

通过Promise.prototype.then和Promise.prototype.catch方法将观察者方法注册到被观察者Promise对象中，同时返回一个新的Promise对象，以便可以链式调用。
被观察者管理内部pending、fulfilled和rejected的状态转变，同时通过构造函数中传递的resolve和reject方法以主动触发状态转变和通知观察者。

1 初始化 Promise 状态（pending）
2  立即执行 Promise 中传入的 fn 函数，将Promise 内部 resolve、reject 函数作为参数传递给 fn ，按事件机制时机处理
3 执行 then(..) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
4 Promise里的关键是要保证，then方法传入的参数 onFulfilled 和 onRejected，必须在then方法被调用的那一轮事件循环之后的新执行栈中执行。


链式调用

```js
function Promise(fn){ 
        let state = 'pending';
        let value = null;
        const callbacks = [];

        then = function (onFulfilled){
            //then 方法中，创建并返回了新的 Promise 实例，这是串行Promise的基础，是实现真正链式调用的根本
          //then 方法传入的形参 onFulfilled 以及创建新 Promise 实例时传入的 resolve 放在一起，被push到当//前 Promise 的 callbacks 队列中，这是衔接当前 Promise 和后邻 Promise 的关键所在
            return new Promise((resolve, reject)=>{
                handle({ //桥梁，将新 Promise 的 resolve 方法，放到前一个 promise 的回调对象中
                    onFulfilled, 
                    resolve
                })
            })
        }

        function handle(callback){
            if(state === 'pending'){
                callbacks.push(callback)
                return;
            }
            
            if(state === 'fulfilled'){
                if(!callback.onFulfilled){
                    callback.resolve(value)
                    return;
                }
                const ret = callback.onFulfilled(value) //处理回调
                callback.resolve(ret) //处理下一个 promise 的resolve
            }
        }
        function resolve(newValue){
            const fn = ()=>{
                if(state !== 'pending')return

                state = 'fulfilled';
                value = newValue
                handelCb()
            }
            
            setTimeout(fn,0) //基于 PromiseA+ 规范
        }
        
        function handelCb(){
            while(callbacks.length) {
                const fulfiledFn = callbacks.shift();
                handle(fulfiledFn);
            };
        }
        
        fn(resolve)
    }


```
这个模型简单易懂，这里最关键的点就是在 then 中新创建的 Promise，它的状态变为 fulfilled 的节点是在上一个 Promise的回调执行完毕的时候。也就是说当一个 Promise 的状态被 fulfilled 之后，会执行其回调函数，而回调函数返回的结果会被当作 value，返回给下一个 Promise(也就是then 中产生的 Promise)，同时下一个 Promise的状态也会被改变(执行 resolve 或 reject)，然后再去执行其回调,以此类推下去...链式调用的效应就出来了。


2. promise all()
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
3. promise.race()
Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

一句话概括Promise.allSettled和Promise.all的最大不同：Promise.allSettled永远不会被reject。

4. promise.allSettled()

Promise.allSettled(promises).then(values=>console.log(values))
// 最终输出： 
//    [
//      {status: "fulfilled", value: 1},
//      {status: "fulfilled", value: 2},
//      {status: "rejected", value: 3},
//    ]
可以看到所有promise的数据都被包含在then语句中，且每个promise的返回值多了一个status字段，表示当前promise的状态，没有任何一个promise的信息被丢失。
因此，当用Promise.allSettled时，我们只需专注在then语句里，当有promise被异常打断时，我们依然能妥善处理那些已经成功了的promise，不必全部重来。

