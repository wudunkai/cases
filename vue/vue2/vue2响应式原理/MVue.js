const compileUtil = {
  getVal(expr,vm){
    // console.log(expr,vm)
    return expr.split('.').reduce((data,currentVal)=>{
      // console.log(data[currentVal])  
      return data[currentVal]    
    },vm.$data);
  },
  setVal(expr,vm,inputVal){
    return expr.split('.').reduce((data,currentVal)=>{
      // console.log(data[currentVal])  
      data[currentVal] = inputVal   
    },vm.$data);
  },
  getContentVal(expr, vm){
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      console.log(args)
      return this.getVal(args[1], vm);
    })
  },
  text(node, expr, vm){//expr:msg 学习MVVM原理
    let value;
    if(expr.indexOf('{{') !== -1){
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // 绑定观察者,将来数据发生变化 触发这里的回调 进行更新
        new Watcher(vm, args[1], () => {
          this.updater.textUpdater(node, this.getContentVal(expr,vm))
        })
        // console.log(args[1],vm)
        return this.getVal(args[1],vm)
      })
    }else{
      // const value = vm.$data[expr];
      value = this.getVal(expr,vm);
    }
    this.updater.textUpdater(node,value)
  },
  html(node, expr, vm){
    // const value = vm.$data[expr];
    const value = this.getVal(expr,vm);
    new Watcher( vm, expr, (newVal)=>{
      this.updater.htmlUpdater(node, newVal)
    })
    this.updater.htmlUpdater(node,value)
  },
  model(node, expr, vm){
    const value = this.getVal(expr,vm);
    // 绑定更新函数 数据 => 视图
    new Watcher( vm, expr, (newVal)=>{
      this.updater.modelUpdater(node, newVal)
    })
    // 视图 => 数据 => 视图
    node.addEventListener('input',(e)=>{
      // 设置值
      this.setVal(expr,vm,e.target.value)
    })
    this.updater.modelUpdater(node,value)
  },
  on(node, expr, vm, eventName){
    let fn = vm.$options.methods && vm.$options.methods[expr]
    node.addEventListener(eventName,fn.bind(vm),false)
  },
  // 更新的函数
  updater:{
    // text
    textUpdater(node,value){
      // console.log(value)
      node.textContent = value
    },
    // html
    htmlUpdater(node,value){
      node.innerHTML = value
    },
    // model
    modelUpdater(node,value){
      node.value = value
    }
  }
}

class Compile{
  constructor(el,vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 1.获取文档碎片对象 放入内存中会减少页面的回流和重绘
    const fragment = this.node2Fragment(this.el);
    // console.log(fragment)
    // 2.编译模板
    this.compile(fragment)
    // 3.追加子元素到根元素
    this.el.appendChild(fragment)
  }
  compile(fragment){
    // 1.获取子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach(child=>{
      // console.log(child)
      if(this.isElementNode(child)){
        // 是元素节点
        // 编译元素节点
        // console.log('元素节点',child)
        this.compileElement(child)
      }else{
        // 文本节点
        // 编译文本节点
        // console.log('文本节点',child)
        this.compileText(child)
      }
      if(child.childNodes && child.childNodes.length){
        this.compile(child)
      }
    })
  }
  compileElement(node){
    // console.log(node)
    const attributes = node.attributes;
    // console.log(attributes)
    [...attributes].forEach(attr=>{
      // console.log(attr)
      const { name,value } = attr;
      // console.log(name);
      if(this.isDirective(name)){//是一个指令 v-text v=html v-model v-on:click
        const [,directive] = name.split('-'); //text html model on:click
        const [dirName,eventName] = directive.split(':'); //text html model on
        // console.log(dirName,node,value,this.vm,eventName)
        // 更新数据 数据驱动视图
        compileUtil[dirName](node,value,this.vm,eventName)
        // 删除有指令的标签上的属性
        node.removeAttribute('v-' + directive);
      }else if(this.isEVentName(name)){ //@click='gettest'
        let [,eventName] = name.split('@');
        compileUtil['on'](node,value,this.vm,eventName)
      }
    })
  }
  compileText(node){
    const content = node.textContent;
    if(/\{\{(.+?)\}\}/.test(content)){
      compileUtil['text'](node,content,this.vm)
    }
  }
  isEVentName(attrName){
    return attrName.startsWith('@');
  }
  isDirective(attrName){
    return attrName.startsWith('v-');
  }
  node2Fragment(el){
    // 创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;
    while(firstChild = el.firstChild){
      f.appendChild(firstChild)
    }
    return f;
  }
  isElementNode(node){
    return node.nodeType === 1
  }
}

class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data,
    this.$options = options;
    if(this.$el){
      // 1.实现一个数据的观察者
      new Observer(this.$data)
      // 2.实现一个指令的解析器
      new Compile(this.$el,this)
      // 实现一个proxy
      this.proxyData(this.$data)
    }
  }
  proxyData(data){
    for(const key in data){
      Object.defineProperty(this,key,{
        get(){
          return data[key]
        },
        set(newVal){
          data[key] = newVal
        }
      })
    }
  }
}