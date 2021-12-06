let _typeof = function (data) {
  let value = /\[object (\w+)\]/.exec(
    Object.prototype.toString.call(data)
  );
  return value ? value[1].toLowerCase() : '';
}
var kvArray = ["1", "2", "3", 12, 20, 20];
var reformattedArray = kvArray.map(function (arg1, arg2, arg3) {
  console.log(`
  arg1:${arg1}, ${_typeof(arg1)}
  arg2:${arg2}, ${_typeof(arg2)}
  arg3:${arg3}, ${_typeof(arg3)}
  `)
  return parseInt(arg1, arg2, arg3)
});
console.log('---', reformattedArray)