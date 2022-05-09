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