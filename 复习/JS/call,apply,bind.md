call，apply，bind ：https://www.kancloud.cn/lixianshengdezhanghao/interview/923661

```
call,apply,bind用于修改this指向
call,apply立即执行
bind不是立即执行，只是返回一个修改了上下文的函数
```

```
var yao = {
    name:"yao",
}
var show = function(x,y) {
    console.log(this)
    return x+y
}

show.call(yao,1,2);//yao,3
show.apply(yao,[1,2]);//yao,3

var show = function (a, b) {
    console.log(this.name);
    console.log("sum", a + b);
}.bind(yao);
show();//yao
```

