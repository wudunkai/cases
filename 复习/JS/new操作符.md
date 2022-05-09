new操作符：https://juejin.cn/post/6844903704663949325

```
//伪数组转数组Array.prototype.slice.call(arguments)

function myNew() {
    let obj = {}
    let Constructor = [].shift.call(arguments); //获取第0个并删除第0个
    obj.__proto__ = Constructor.prototype
    let rs = Constructor.apply(obj,arguments)
    return typeof rs == "object" ? rs : obj
}
function Person(name,age) {
    this.name = name
    this.age = age
    return {
        "a": 1
    }
}
const p1 = new Person("leilei", 27)
const p2 = myNew(Person,"leilei", 27)
console.log(p1,p2)
```

