1. let 和 const

   这两个的出现，总感觉是为了开发的代码规范而出现的。我们要逐渐放弃 var，在项目中多用 let 和 const

   与 var 的区别：

   - var 有变量提升，有初始化提升，值可变
   - let 有变量提升，没有初始化提升，值可以变
   - const 有变量提升，没有初始化提升，值不可变，但如果是定义对象，则属性可变

   `暂时性死区`问题说明：其实`let和const`是有变量提升的，但是没有初始化提升：

   ```js
   var name = "吴";
   function fn() {
     console.log(name);
     let name = "wu";
   }
   fn(); //Cannot access 'name' before initialization
   ```

   块级作用域解决问题：

   ```js
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

   ```js
   function fn(name, age) {
     var name = name || "吴";
     var age = age || 18;
     console.log(name, age);
   }
   fn(); // 吴 18
   ```

   但是这么写确实不优雅，可以使用 es6 的默认参数

   ```js
   function fn(name = "吴", age = 18) {
     console.log(name, age);
   }
   fn(); // 吴 18
   fn("wu", 24); // wu 24
   ```

3. 扩展运算符

   ```js
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

   ```js
   function fn(name, ...params) {
     console.log(name);
     console.log(params);
   }
   fn("吴", 1, 2); // 吴 [ 1, 2 ]
   fn("吴", 1, 2, 3, 4, 5); // 吴 [ 1, 2, 3, 4, 5 ]
   ```

5. 模板字符串

   ```js
   const name = "吴";
   const age = "24";

   console.log(name + "今年" + age + "岁啦"); // 吴今年24岁啦
   console.log(`${name}今年${age}岁啦`); // 吴今年24岁啦
   ```

6. Object.keys

   可以用来获取对象的 key 的集合，进而可以获得对应 key 的 value

   ```js
   const obj = {
     name: "吴",
     age: 24,
     sex: "男",
   };
   console.log(Object.keys(obj));
   // ['name','age','gender']
   ```

7. 箭头函数

   ```js
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

   ```js
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

   ```js
   const mapArr = [1, 2, 3, 4, 5];
   // 三个参数：遍历项 索引 数组本身
   // 配合箭头函数，对每一个元素进行翻倍
   const mapArr2 = mapArr.map((num, index, arr) => 2 * num);
   console.log(mapArr2); // [(2, 4, 6, 8, 10)];
   ```

10. Array.prototype.filter

    常用于返回一个处理过后的新数组

    ```js
    const mapArr = [1, 2, 3, 4, 5];
    // 三个参数：遍历项 索引 数组本身
    // 配合箭头函数，对每一个元素进行翻倍
    const mapArr2 = mapArr.map((num, index, arr) => 2 * num);
    console.log(mapArr2); // [(2, 4, 6, 8, 10)];
    ```

11. Array.prototype.some

    some，意思就是只要有一个是真，那就返回真

    ```js
    const someArr = [false, true, false, true, false];

    // 三个参数：遍历项 索引 数组本身
    // 配合箭头函数，只要有一个为true，就返回true，一个都true都没有，就返回false
    const someArr2 = someArr.some((bol, index, arr) => bol);
    console.log(someArr2);
    // true
    ```

12. Array.prototype.every

    every 跟 some 是相反的，some 是只要有一个就行，every 是要所有为真才返回真

    ```js
    const everyArr = [false, true, false, true, false];
    // 三个参数：遍历项 索引 数组本身
    // 配合箭头函数，需要所有为true，才返回true，否则返回false
    const everyArr2 = everyArr.every((bol, index, arr) => bol);
    console.log(everyArr2);
    ```

13. Array.prototype.reduce

    - 第一个参数 callback 函数：pre 为上次 return 的值，next 为数组的本次遍历的项
    - 第二个参数为初始值，也是第一个 pre

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
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

    ```js
    const arr = [1, 2, 3, 4, 4, 5, 5, 66, 9, 1];
    // Set可利用扩展运算符转为数组哦
    const quChonGArr = [...new Set(arr)];
    console.log(quChonGArr); // [1,  2, 3, 4, 5, 66, 9]
    ```

    Map 对比 object 最大的好处就是，key 不受类型限制

    ```js
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

21. includes

    传入元素，如果数组中能找到此元素，则返回 true，否则返回 false

    ```js
    const includesArr = [1, 2, 3, 5];
    const isI = includesArr.includes(1);
    console.log(isI); // true

    // 跟indexOf很像，但还是有区别的
    const arr = [1, 2, NaN];
    console.log(arr.indexOf(NaN)); // -1  indexOf找不到NaN
    console.log(arr.includes(NaN)); // true includes能找到NaN
    ```

22. 求幂运算符

    ```js
    // 以前求幂，我们需要这么写
    const num = Math.pow(3, 2); // 9

    // ES7提供了求幂运算符：**
    const num = 3 ** 2; // 9
    ```

23. Object.values

    ```js
    // 用来获取对象的value的集合
    const obj = {
      name: "wu",
      age: 24,
    };
    const value = Object.values(obj);
    console.log(value); // ['wu',24]
    ```

24. Object.entries

    ```js
    // 可以用来获取对象的键值对集合
    const obj = {
      name: "wu",
      age: 24,
    };
    const entries = Object.entries(obj);
    console.log(entries);
    // [ [ 'name', 'wu' ], [ 'age', 24 ] ]
    ```

25. async/await `以同步方式执行异步操作`

    ```js
    function fn1() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(5);
        }, 1000);
      });
    }
    function fn2(data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(data * 10);
        }, 2000);
      });
    }
    async function req() {
      // 同步方式执行异步，像排队一样
      const data1 = await fn1(); // 等待1秒后返回数据再往下执行
      const data2 = await fn2(data1); // 拿data1去请求2秒后，往下走
      console.log(data2); // 总共3秒后 输出 50
    }
    req();
    ```

26. for await of

    ```js
    function fn(time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(`${time}毫秒后我成功啦！！！`);
        }, time);
      });
    }
    fn(3000).then((res) => console.log(res));
    fn(1000).then((res) => console.log(res));
    fn(2000).then((res) => console.log(res));
    // 1000毫秒后我成功啦！！！
    // 2000毫秒后我成功啦！！！
    // 3000毫秒后我成功啦！！！
    async function asyncFn() {
      // 排队
      const data1 = await fn(3000);
      console.log(data1); // 3秒后 3000毫秒后我成功啦！！！
      const data2 = await fn(1000);
      console.log(data2); // 再过1秒 1000毫秒后我成功啦！！！
      const data3 = await fn(2000);
      console.log(data3); // 再过2秒 2000毫秒后我成功啦！！！
    }
    async function asyncFn() {
      const arr = [fn(3000), fn(1000), fn(1000), fn(2000), fn(500)];
      for await (let x of arr) {
        console.log(x);
      }
    }
    asyncFn();
    // 3000毫秒后我成功啦！！！
    // 1000毫秒后我成功啦！！！
    // 1000毫秒后我成功啦！！！
    // 2000毫秒后我成功啦！！！
    // 500毫秒后我成功啦！！！
    ```

27. Promise.finally

    `新增的Promise方法，无论失败或者成功状态，都会执行这个函数`

    ```js
    new Promise((resolve, reject) => {
      resolve("成功喽");
    })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        console.log("我是finally");
      });

    new Promise((resolve, reject) => {
      reject("失败喽");
    })
      .then(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        console.log("我是finally");
      });
    ```

28. Array.flat

    ```js
    // 有一个二维数组，我想让他变成一维数组
    const arr = [1, 2, 3, [4, 5, 6]];
    console.log(arr.flat()); // [ 1, 2, 3, 4, 5, 6 ]

    // 传参数，参数为降维的次数
    const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];
    console.log(arr.flat(2)); // [(1, 2, 3, 4, 5, 6, 7, 8, 9)];

    // 如果传的是一个无限的数字
    const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];
    console.log(arr.flat(Infinity)); // [(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12)];
    ```

29. Array.flatMap

    ```js
    let arr = ["科比 詹姆斯 安东尼", "利拉德 罗斯 麦科勒姆"];
    console.log(arr.map((x) => x.split(" ")).flat());
    // [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]

    console.log(arr.flatMap((x) => x.split(" ")));
    // [ '科比', '詹姆斯', '安东尼', '利拉德', '罗斯', '麦科勒姆' ]
    ```

30. BigInt
    BigInt 是 ES10 新加的一种 js 数据类型，用来表示表示大于 2^53 - 1 的整数，2^53 - 1 是 ES10 之前，js 所能表示最大的数字
    Number、String、Boolean、undefined、object、Null、Symbol、BigInt。

    ```js
    const theBiggestInt = 9007199254740991n;
    const alsoHuge = BigInt(9007199254740991);
    // 9007199254740991n
    const hugeString = BigInt("9007199254740991");
    // 9007199254740991n
    const hugeHex = BigInt("0x1fffffffffffff");
    // 9007199254740991n
    const hugeBin = BigInt(
      "0b11111111111111111111111111111111111111111111111111111"
    );
    // 9007199254740991n
    const bigNum = BigInt(1728371927189372189739217);
    console.log(typeof bigNum); // bigint
    ```

31. Symbol

    - 使用 Symbol 来作为对象属性名

    ```js
    const obj = {
      name: "wu",
      age: 24,
    };
    console.log(obj["name"]); // 'wu'
    console.log(obj["age"]); // 24
    // 用Symbol来当做属性名
    const gender = Symbol("gender");
    const obj1 = {
      name: "wu",
      age: 24,
      [gender]: "男",
    };
    console.log(obj1["name"]); // 'wu'
    console.log(obj1["age"]); // 24
    console.log(obj1[gender]); // 男

    // 但是 Symbol 作为属性的属性不会被枚举出来，这也是 JSON.stringfy(obj)时，Symbol 属性会被排除在外的原因
    console.log(Object.keys(obj1)); // [ 'name', 'age' ]
    for (const key in obj1) {
      console.log(key); // name age
    }
    console.log(JSON.stringify(obj1)); // {"name":"wu","age":24}

    // 其实想获取Symbol属性也不是没办法。
    // 方法一
    console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(gender) ]
    // 方法二
    console.log(Reflect.ownKeys(obj)); // [ 'name', 'age', Symbol(gender) ]
    ```

    - 使用 Symbol 来替代常量

    ```js
    // 赋值
    const one = "oneXin";
    const two = "twoXin";
    function fun(key) {
      switch (key) {
        case one:
          return "one";
          break;
        case two:
          return "two";
          break;
      }
    }
    // 如果变量少的话还好，但是变量多的时候，赋值命名很烦，可以利用Symbol的唯一性
    const one = Symbol();
    const two = Symbol();
    ```

    - 定义类的私有属性

    ```js
    class Login {
      constructor(username, password) {
        const PASSWORD = Symbol();
        this.username = username;
        this[PASSWORD] = password;
      }
      checkPassword(pwd) {
        return this[PASSWORD] === pwd;
      }
    }
    const login = new Login("123456", "hahah");
    console.log(login.PASSWORD); // undefined
    console.log(login[PASSWORD]); // 报错
    console.log(login.checkPassword()); // 报错
    ```

32. 对象计算属性

    ```js
    if (type === "boy") {
      this.setData({
        boyName: name,
      });
    } else if (type === "girl") {
      this.setData({
        girlName: name,
      });
    }

    //
    this.setData({
      [`${type}Name`]: name,
    });
    ```

33. ||= 和 &&=

    ```js
    // 或等于(||=)
    a ||= b;
    //等同于
    a || (a = b);

    // 且等于(&&=)
    a &&= b;
    //等同于
    a && (a = b);
    ```

34. 数字分隔符

    ```js
    const num = 1000000000;

    // 使用数字分隔符
    const num = 1_000_000_000;
    ```

35. ?. 和 ??

    - ?.可选链

    ```js
    const obj = {
      cat: {
        name: "哈哈",
      },
    };
    const dog = obj && obj.dog && obj.dog.name; // undefined
    // 可选链
    const obj = {
      cat: {
        name: "哈哈",
      },
    };
    const dog = obj?.dog?.name; // undefined
    ```

    - ?? 空位合并运算符

    ```js
    // || 运算符，只要左边是 假值,就会返回右边的数据
    const a = 0 || "wu"; // wu
    const b = "" || "wu"; // wu
    const c = false || "wu"; // wu
    const d = undefined || "wu"; // wu
    const e = null || "wu"; // wu
    // ?? 和 ||最大的区别就是，??只有undefined和null才算假值
    const a = 0 ?? "wu"; // 0
    const b = "" ?? "wu"; // ''
    const c = false ?? "wu"; // false
    const d = undefined ?? "wu"; // wu
    const e = null ?? "wu"; // wu
    ```

36. String.trimStart && String.trimEnd

    ```js
    // JavaScript有个trim方法，可以清除字符串首尾的空格
    const str = "    wu    ";
    console.log(str.trim()); // 'wu'

    //trimStart和trimEnd用来单独去除字符串的首和尾的空格
    // 去除首部空格
    console.log(str.trimStart()); // 'wu   '
    // 去除尾部空格
    console.log(str.trimEnd()); // '   wu'
    ```

37. Object.fromEntries

    Object.entries 是把`对象转成键值对数组`，而 Object.fromEntries 则是相反，是把`键值对数组转为对象`

    ```js
    const arr1 = [
      ["name", "wu"],
      ["age", 22],
      ["gender", "男"],
    ];
    console.log(Object.fromEntries(arr1)); // { name: 'wu', age: 22, gender: '男' }

    const map = new Map();
    map.set("name", "wu");
    map.set("age", 22);
    map.set("gender", "男");

    console.log(map); // Map(3) { 'name' => 'wu', 'age' => 22, 'gender' => '男' }
    const obj = Object.fromEntries(map);
    console.log(obj);
    // { name: 'wu', age: 22, gender: '男' }
    const arr = Object.entries(obj);
    console.log(arr);
    // [["name", "wu"],  ["age", 22],  ["gender", "男"],];
    ```
