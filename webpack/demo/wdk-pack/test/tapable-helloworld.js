let { SyncHook } = require('tapable')

class Frontend {
  constructor(){
    // 1. 定义好钩子(定义生命周期)
    this.hooks = {
      // 如果需要在call时传参,则需要在new SyncHook时定义需要的参数
      beforeStudy: new SyncHook(),
      afterHtml: new SyncHook(),
      afterCss: new SyncHook(),
      afterJs: new SyncHook(),
      afterVue: new SyncHook(['name']),
    }
  }
  study(){
    // 2. 让钩子在知道
    console.log('开始了')
    this.hooks.beforeStudy.call()
    
    console.log('html')
    this.hooks.afterHtml.call()

    console.log('css')
    this.hooks.afterCss.call()

    console.log('js')
    this.hooks.afterJs.call()

    console.log('vue')
    this.hooks.afterVue.call('wdk')
  }
}

let f = new Frontend()

// 3. 注册事件
f.hooks.afterHtml.tap('afterHtml', () => {
  console.log('学完html后我想造淘宝!!!')
})
f.hooks.afterJs.tap('afterJs', () => {
  console.log('学完js后我想造webpack!!!')
})
f.hooks.afterVue.tap('afterVue', (name) => {
  console.log(name + '真牛逼!')
  console.log('学完vue后我想造地球!!!')
})

f.study()