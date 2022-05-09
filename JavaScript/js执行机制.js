setTimeout(function () {
  console.log(5, '5');
  process.nextTick(function () {
    console.log(7, '7');
  })
  Promise.resolve().then(() => {
    console.log(6, '0');
  });
  new Promise(function (resolve) {
    console.log(8, '0');
    resolve();
  }).then(function () {
    console.log(9, '2')
  })
})
process.nextTick(function () {
  console.log(3, '号');
})
new Promise(function (resolve) {
  console.log(1, '手');
  resolve();
}).then(function () {
  console.log(4, '1')
})
setTimeout(function () {
  process.nextTick(function () {
    console.log(13, '5');
  })
  Promise.resolve().then(() => {
    console.log(12, '5');
  });
  console.log(10, '3');
  new Promise(function (resolve) {
    console.log(11, '4');
    resolve();
  }).then(function () {
    console.log(14, '1')
  })
})
console.log(2, '机');