let oldObj = {
  name: '小野',
  age: 20,
  colors: ['red', 'blue', 'green'],
  friend: {
    name: '小余'
  }
}
// 第一种
let newObj1 = JSON.parse(JSON.stringify(oldObj))
newObj1.name = '小新'
// console.log('oldObj', oldObj);
// console.log('newObj1', newObj1);

function copy(obj) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  let result;
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }
  for (const key in obj) {
    result[key] = copy(obj[key])
  }
  return result
}
let newObj2 = copy(oldObj)

newObj2.name = '小默'
newObj2.friend.name = '小默'
newObj2.age = 30
newObj2.colors[0] = 'orange'
console.log('oldObj', oldObj);
console.log('newObj2', newObj2);