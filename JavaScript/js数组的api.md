# 影响原数组

- push 在数组后添加元素，返回长度
- pop 删除数组最后一项，返回被删项
- shift 删除数组第一项，返回被删项
- unshift 添加数组第一项，返回长度
- reserve 反转数组，返回数组
- sort 排序数组，返回数组
- splice 截取数组，返回被截取部分
- fill 填充数组，返回新数组
  ```js
  let arr = ["1", "2", "3"];
  arr.fill(0); // [0,0,0]
  ```
- copyWithinArr 复制替换数组，类似 splice,返回新数组
  ```js
  let arr = [1, 2, 3, 4, 5];
  arr.copyWithin(1, 3, 5); // [1,4,5,4,5]
  ```

# 不影响原数组

- join 将数组变成字符串，返回字符串
- concat 连接数组
- map 相同规则处理数组项，返回新数组
- forEach 遍历数组
- filter 过滤数组项，返回符合条件的数组
- every 每一项符合规则才返回 true
- some 只要有一项符合规定就返回 true
- reduce 接受上一个 return 和数组下一项
- reduceRight 类似 reduce，从后往前去遍历
- flat 数组扁平化
- flatMap 扁平
  ```js
  let arr = [1, 2, [3], 4, [5]];
  const flatMapArr = arr.flatMap((item) => item);
  // [1,2,3,4,5]
  let arr1 = [1, 2, [3, [4, 5]], 6, [7, [8, 9]]];
  const flatMapArr = arr1.flatMap((item) => item);
  //  [1, 2, 3, [4,5], 6, 7, [8,9]]
  ```
- slice 截取数组，返回被截取区间
- every 所有必须为真，返回 true 或者 false
- some 至少一个为真，返回 true 或者 false
- indexOf 查询索引，从前往后查
- lastIndexOf 从后往前查 这两个方法查不了 NaN 的索引
- includes 包含， 可以查看包含
- find & findLast 寻找元素，查出数组第一个计算返回真值的元素
- findIndex & findLastIndex 寻找索引，查出数组第一个计算返回真值的索引
- at 寻找元素
  ```js
  let arr = [1, 2, 3, 4, 5];
  arr.at(1); // 2
  arr.at(-2); // 4 等同 arr.at(arr.length - 2)
  ```
- of 生成数组
  ```js
  Array.of(1, 2, 3); // [1,2,3]
  ```
- toString 转字符串，类似与 join(',')
