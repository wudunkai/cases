setTimeout(function() {
  console.log('5');
  process.nextTick(function() {
    console.log('7');
  })
  Promise.resolve().then(() => {
    console.log('0');
  });
  new Promise(function(resolve) {
    console.log('0');
    resolve();
  }).then(function() {
    console.log('2')
  })
})
process.nextTick(function() {
  console.log('号');
})
new Promise(function(resolve) {
  console.log('手');
  resolve();
}).then(function() {
  console.log('1')
})
setTimeout(function() {
  process.nextTick(function() {
    console.log('5');
  })
  Promise.resolve().then(() => {
    console.log('5');
  });
  console.log('3');
  new Promise(function(resolve) {
    console.log('4');
    resolve();
  }).then(function() {
    console.log('1')
  })
})
console.log('机');