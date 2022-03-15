- vue2 对 ts 支持较差，vue3 时已解决
- vue2 对 jsx 支持较差，vue3 时已解决
- vue 和 react 都是单向数据流
- vue 多用模板 template，react 多用 jsx
- vue 的双向绑定，react 是单向绑定
- vue 和 react 都倡导组件化开发
- vue 和 react 都支持服务端渲染
- vue2 的状态管理工具 vuex，vue3 用 pinia，react 用 redux、mobx、recoil
- vue 的 diff 算法比 react 更高效
- react 的写法更贴近 js 原生

Vue 实例从创建到销毁的过程就是生命周期，既指从创建、初始化数据、编译模块、挂载 DOM 渲染、更新 DOM 渲染、销毁等一系列过程，主要分为 8 个阶段，创建前后，挂载前后，更新前后，销毁前后，以及一些特殊场景的生命周期

通过 Object.defineProperty 为对象的每个 key 设置 getter 和 setter，从而拦截对数据的访问和设置。
当对数据进行更新操作时，比如`obj.key='new val'`就会触发 setter 的拦截，从而检测新值和旧值是否相等，如果相等什么也不做，如果不相等，则更新值，然后通过 dep 通知 watcher 进行更新。所以，异步更新的入口点就是 setter 中最后调用 dep.notify()方法
