 https://juejin.cn/post/6844904095195594765
BFC-块格式化上下文 https://www.itcast.cn/news/20201016/16152387135.shtml

BFC

```
每一个BFC只包括其子元素，不包括其子元素的子元素
每一个BFC都是互相隔离的，互不影响
```

BFC条件

```
1. 以body为根元素的
2. position为absolute，fixed的元素
3. overflow为hidden，auto，scroll的元素
4. float不为none的，(left,right,inherit可以)
5. display为inline-block的
6. 表格单元，tabel-cell的
7. flex布局的
```

BFC解决的情况

```
1. margin塌陷，比如两个元素设置margin100，间距还是100而不是200
2. 子元素设置margin把父元素带跑偏
3. 浮动产生的时候清除浮动
4. 解决正常元素被浮动元素盖住
```





