- this指向：

https://blog.csdn.net/xuehangongzi/article/details/80841167

函数调用方式决定了this指向不同

```
1. 普通函数调用，this指向window
2. 构造函数调用，this指向实例对象
3. 对象方法调用，this指向该方法所属的对象
4. 事件绑定，this指向绑定事件的对象
5. 定时器函数，this指向window
```

修改this的三种方式

```
call  fn.call(obg,param1,param2)参数列表
apply  fn.call(obg,[param1,param2])参数数组
bind  创建的一个新函数，与被调用函数有相同的函数体，当目标函数调用时this指向绑定到bind()第一个参数上
call、apply、bind用来改变this指向。
call和apply是直接执行
bind调用后不会直接执行，而是返回一个改变了上下文的函数副本
```

- react中为什么使用bind：


https://www.jianshu.com/p/00ba2218e65f?utm_campaign=maleskine

```
因为没有直接调用对象方法，而是将对象方法声明给一个中间变量，比如onClick
```

```
解决方案：
1. 箭头函数 onClick={() => this.handleClick}
2. 调用的地方 onClick={this.handleClick.bind(this)}
3. 在构造函数中bind this.handleClick = this.handleClick.bind(this);
```

- 箭头函数和普通函数的区别：


<https://www.cnblogs.com/chenhaiyun/p/14911084.html>

```
箭头函数和普通函数的区别说明：
1、this指向不同
1.1普通函数 —— 谁调用这个函数 ，this就指向谁
1.2箭头函数 —— 在哪里定义函数，this指向谁
```

```
箭头函数和普通函数的区别说明：
1、this指向不同
1.1普通函数 —— 谁调用这个函数 ，this就指向谁
1.2箭头函数 —— 在哪里定义函数，this指向谁

箭头函数都是匿名函数
不能用于构造函数，不具有prototype原型对象，不具有super，没有new.target，不能使用new
没有arguments，只能通过rest获取
不能使用yield命令
```

