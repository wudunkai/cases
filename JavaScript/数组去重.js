let arr = [1,1,2,2,3,4,5,5,6,7,7,8,9,9];
console.log([...new Set(arr)]);

function unique(arr) {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item, 0) === index
  })
}
console.log(unique(arr))

let newArr = arr.reduce((ar,cur) => {
  console.log(ar,cur)
  if(!ar.includes(cur)){
    ar.push(cur)
  }
  return ar
},[]);

console.log(newArr)