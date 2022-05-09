function add(num1,num2) {
  let num = num1+num2;
  if(num2+1>100){
    return num;
  }else{
    return add(num,num2+1)
  }
}
let sum = add(1, 2)
console.log(sum)