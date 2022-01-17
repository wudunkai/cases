1. let 和 const

   这两个的出现，总感觉是为了开发的代码规范而出现的。我们要逐渐放弃 var，在项目中多用 let 和 const

   与 var 的区别：

   - var 有变量提升，有初始化提升，值可变
   - let 有变量提升，没有初始化提升，值可以变
   - const 有变量提升，没有初始化提升，值不可变，但如果是定义对象，则属性可变

   `暂时性死区`问题说明：其实`let和const`是有变量提升的，但是没有初始化提升：

   ```javascript
   var name = "吴";
   function fn() {
     console.log(name);
     let name = "wu";
   }
   fn(); //Cannot access 'name' before initialization
   ```

   块级作用域解决问题：

   ```javascript
   for (var i = 0; i < 5; i++) {
     setTimeout(() => {
       console.log(i);
     });
   } // 5 5 5 5 5
   for (let i = 0; i < 5; i++) {
     setTimeout(() => {
       console.log(i);
     });
   } // 0 1 2 3 4
   ```

2. 默认参数
   开发中你曾遇到过这样的问题，如果参数不传进来，你就设置默认参数

   ```javascript
   function fn(name, age) {
     var name = name || "吴";
     var age = age || 18;
     console.log(name, age);
   }
   fn(); // 吴 18
   ```

   但是这么写确实不优雅，可以使用 es6 的默认参数

   ```javascript
   function fn(name = "吴", age = 18) {
     console.log(name, age);
   }
   fn(); // 吴 18
   fn("wu", 24); // wu 24
   ```

3. 扩展运算符

   ```javascript
   const arr1 = [1, 2, 4];
   const arr2 = [4, 5, 7];
   const arr3 = [7, 8, 9];

   const Arr1 = arr1.concat(arr2).concat(arr3);
   //[(1, 2, 4, 4, 5, 7, 7, 8, 9)];
   //es6
   const Arr2 = [...arr1, ...arr2, ...arr3];
   //[(1, 2, 4, 4, 5, 7, 7, 8, 9)];
   ```

4. 剩余参数

   ```javascript
   function fn(name, ...params) {
     console.log(name);
     console.log(params);
   }
   fn("吴", 1, 2); // 吴 [ 1, 2 ]
   fn("吴", 1, 2, 3, 4, 5); // 吴 [ 1, 2, 3, 4, 5 ]
   ```

5. 模板字符串

   ```javascript
   const name = "吴";
   const age = "24";

   console.log(name + "今年" + age + "岁啦"); // 吴今年24岁啦
   console.log(`${name}今年${age}岁啦`); // 吴今年24岁啦
   ```

6. Object.keys

   可以用来获取对象的 key 的集合，进而可以获得对应 key 的 value

   ```javascript
   const obj = {
     name: "吴",
     age: 24,
     sex: "男",
   };
   console.log(Object.keys(obj));
   // ['name','age','gender']
   ```

7. 箭头函数

   ```javascript
   function fn() {}
   const fn = function () {};

   // ES6新加了箭头函数
   const fn = () => {};
   // 如果只有一个参数，可以省略括号
   const fn = (name) => {};
   // 如果函数体里只有一句return
   const fn = (name) => {
     return 2 * name;
   };
   // 可简写为
   const fn = (name) => 2 * name;
   // 如果返回的是对象
   const fn = (name) => ({ name: name });
   // 普通函数和箭头函数的区别：
    - 箭头函数不可作为构造函数，不能使用new
    - 箭头函数没有自己的this
    - 箭头函数没有arguments对象
    - 箭头函数没有原型对象
   ```

8. Array.prototype.forEach

   ES6 新加的数组遍历方法

   ```javascript
   const eachArr = [1, 2, 3, 4, 5];

   // 三个参数：遍历项 索引 数组本身
   // 配合箭头函数
   eachArr.forEach((item, index, arr) => {
     console.log(item, index, arr);
   });
   // 1 0 [ 1, 2, 3, 4, 5 ]
   // 2 1 [ 1, 2, 3, 4, 5 ]
   // 3 2 [ 1, 2, 3, 4, 5 ]
   // 4 3 [ 1, 2, 3, 4, 5 ]
   // 5 4 [ 1, 2, 3, 4, 5 ]
   ```

9. Array.prototype.map

   常用于返回一个处理过后的新数组

   ```javascript
   const mapArr = [1, 2, 3, 4, 5];
   // 三个参数：遍历项 索引 数组本身
   // 配合箭头函数，对每一个元素进行翻倍
   const mapArr2 = mapArr.map((num, index, arr) => 2 * num);
   console.log(mapArr2); // [(2, 4, 6, 8, 10)];
   ```

10. Array.prototype.filter

    常用于返回一个处理过后的新数组

    ```javascript
    const mapArr = [1, 2, 3, 4, 5];
    // 三个参数：遍历项 索引 数组本身
    // 配合箭头函数，对每一个元素进行翻倍
    const mapArr2 = mapArr.map((num, index, arr) => 2 * num);
    console.log(mapArr2); // [(2, 4, 6, 8, 10)];
    ```

11. Array.prototype.some

    some，意思就是只要有一个是真，那就返回真

    ```javascript
    const someArr = [false, true, false, true, false];

    // 三个参数：遍历项 索引 数组本身
    // 配合箭头函数，只要有一个为true，就返回true，一个都true都没有，就返回false
    const someArr2 = someArr.some((bol, index, arr) => bol);
    console.log(someArr2);
    // true
    ```

12. Array.prototype.every

    every 跟 some 是相反的，some 是只要有一个就行，every 是要所有为真才返回真

    ```javascript
    const everyArr = [false, true, false, true, false];
    // 三个参数：遍历项 索引 数组本身
    // 配合箭头函数，需要所有为true，才返回true，否则返回false
    const everyArr2 = everyArr.every((bol, index, arr) => bol);
    console.log(everyArr2);
    ```

13. Array.prototype.reduce

    - 第一个参数 callback 函数：pre 为上次 return 的值，next 为数组的本次遍历的项
    - 第二个参数为初始值，也是第一个 pre

    ```javascript
    // 计算 1 + 2 + 3 + 4 + 5
    const reduceArr = [1, 2, 3, 4, 5];
    const sum = reduceArr.reduce((pre, next) => {
      return pre + next;
    }, 0);
    console.log(sum); // 15

    // 统计元素出现个数
    const nameArr = ["吴", "wu", "吴", "吴", "wu"];
    const totalObj = nameArr.reduce((pre, next) => {
      if (pre[next]) {
        pre[next]++;
      } else {
        pre[next] = 1;
      }
      return pre;
    }, {});
    console.log(totalObj); // { '吴': 3, 'wu': 2 }
    ```

14. 对象属性同名简写

    ```javascript
    // 以前同名属性需要这么写
    const name = "wu";
    const age = "24";

    const obj1 = {
      name: name,
      age: age,
    };
    // ES6新增语法，只需这么写
    // 属性同名可简写
    const obj2 = {
      name,
      age,
    };
    console.log(obj1); // { name: 'wu', age: '24' }
    console.log(obj2); // { name: 'wu', age: '24' }
    ```

15. Promise

    [Promise](./Promise.js)，中文名为承诺，承诺在哪呢？承诺在，一旦他的状态改变，就不会再改。这里就介绍基本使用，如果想要深入理解如何使用，请看我的另一篇文章看了就会，手写 Promise 原理，最通俗易懂的版本！！！

16. class

    ```javascript
    // 构造函数生成对象
    function Person(name) {
      this.name = name;
    }
    Person.prototype.sayName = function () {
      console.log(this.name);
    };
    const P = new Person("科比");
    P.sayName(); // 科比
    // ES6
    class NewPerson {
      constructor(name) {
        // 构造器
        this.name = name;
      }
      sayName() {
        console.log(this.name);
      }
    }
    const NP = new Person("科比");
    NP.sayName(); // 科比
    class NPerson {}
    console.log(typeof NPerson); // function
    ```

17. 解构赋值

    ```javascript
    const obj = {
      name: "wu",
      age: 24,
      gender: "男",
      doing: {
        morning: "摸鱼",
        afternoon: "摸鱼",
        evening: "sleep",
      },
    };
    const { name, age, gender } = obj;
    console.log(name, age, gender); // wu 24 男
    // 解构重名
    const { name: myName } = obj;
    console.log(myName); // wu
    // 嵌套解构
    const {
      doing: { evening },
    } = obj;
    console.log(evening); // sleep
    ```

    进行数组的解构

    ```javascript
    const arr = [1, 2, 3];
    const [a1, b1, c1] = arr;
    console.log(a1, b1, c1); // 1 2 3
    // 默认赋值
    const [a2, b2, c2, d2 = 5] = arr;
    console.log(a2, b2, c2, d2); // 1 2 3 5
    // 乱序解构
    const { 1: a3, 0: b3, 2: c3 } = arr;
    console.log(a3, b3, c3); // 2 1 3
    ```

18. find 和 findIndex

    - find: 找到返回被找元素,找不到返回 undefined
    - findIndex: 找到返回被找元素索引,找不到返回-1

    ```javascript
    const findArr = [
      { name: "科比", no: "24" },
      { name: "罗斯", no: "1" },
      { name: "利拉德", no: "0" },
    ];

    const kobe = findArr.find(({ name }) => name === "科比");
    const kobeIndex = findArr.findIndex(({ name }) => name === "科比");
    console.log(kobe); // { name: '科比', no: '24' }
    console.log(kobeIndex); // 0
    ```

19. for of 和 for in

    - for in：遍历方法，可遍历对象和数组，遍历的索引（即键名）
    - for of：遍历方法，只遍历数组，而不包括数组的原型属性 method 和索引 name，遍历的值

    ```javascript
    const obj = { name: "wu", age: 22, gender: "男" };
    const arr = [1, 2, 3, 4, 5];

    for (let key in obj) {
      console.log(key);
    }
    // name age gender
    for (let index in arr) {
      console.log(index);
    }
    // 0 1 2 3 4
    for (let item of arr) {
      console.log(item);
    }
    // 1 2 3 4 5
    ```

20. Set 和 Map

    ```javascript
    // 可不传数组
    const set1 = new Set();
    set1.add(1);
    set1.add(2);
    console.log(set1); // Set(2) { 1, 2 }
    // 也可传数组
    const set2 = new Set([1, 2, 3]);
    // 增加元素 使用 add
    set2.add(4);
    set2.add("wu");
    console.log(set2); // Set(5) { 1, 2, 3, 4, 'wu' }
    // 是否含有某个元素 使用 has
    console.log(set2.has(2)); // true
    // 查看长度 使用 size
    console.log(set2.size); // 5
    // 删除元素 使用 delete
    set2.delete(2);
    console.log(set2); // Set(4) { 1, 3, 4, 'wu' }
    ```

    Set 的不重复性

    ```javascript
    // 增加一个已有元素，则增加无效，会被自动去重
    const set1 = new Set([1]);
    set1.add(1);
    console.log(set1); // Set(1) { 1 }
    // 传入的数组中有重复项，会自动去重
    const set2 = new Set([1, 2, "wu", 3, 3, "wu"]);
    console.log(set2); // Set(4) { 1, 2, 'wu', 3 }

    //  Set的不重复性中，要注意引用数据类型和NaN
    // 两个对象都是不同的指针，所以没法去重
    const set3 = new Set([1, { name: "wu" }, 2, { name: "wu" }]);
    console.log(set3); // Set(4) { 1, { name: 'wu' }, 2, { name: 'wu' } }

    // 如果是两个对象是同一指针，则能去重
    const obj = { name: "wu" };
    const set4 = new Set([1, obj, 2, obj]);
    console.log(set4); // Set(3) { 1, { name: 'wu' }, 2 }

    //咱们都知道 NaN !== NaN，NaN是自身不等于自身的，但是在Set中他还是会被去重
    const set = new Set([1, NaN, 1, NaN]);
    console.log(set); // Set(2) { 1, NaN }
    ```

    利用 Set 的不重复性，可以实现数组去重

    ```javascript
    const arr = [1, 2, 3, 4, 4, 5, 5, 66, 9, 1];
    // Set可利用扩展运算符转为数组哦
    const quChonGArr = [...new Set(arr)];
    console.log(quChonGArr); // [1,  2, 3, 4, 5, 66, 9]
    ```

    Map 对比 object 最大的好处就是，key 不受类型限制

    ```javascript
    // 定义map
    const map1 = new Map();
    // 新增键值对使用set(key, value)
    map1.set(true, 1);
    map1.set(1, 2);
    map1.set("哈哈", "嘻嘻");
    console.log(map1); // Map(3) { true => 1, 1 => 2, '哈哈' => '嘻嘻' }
    // 判断map是否含有某个key 使用 has(key)
    console.log(map1.has("哈哈")); // true
    // 获取map中某个key对应的value 使用 get(key)
    console.log(map1.get(true)); // 1
    // 删除map中某个键值对 使用 delete(key)
    map1.delete("哈哈");
    console.log(map1); // Map(2) { true => 1, 1 => 2 }

    // 定义map，也可传入键值对数组集合
    const map2 = new Map([
      [true, 1],
      [1, 2],
      ["哈哈", "嘻嘻嘻"],
    ]);
    console.log(map2); // Map(3) { true => 1, 1 => 2, '哈哈' => '嘻嘻嘻' }
    ```
