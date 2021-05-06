function sort(params) {
  for (let i = 0; i < params.length - 1; i++) {
    // console.log(params[i])
    for (let j = 0; j < params.length - i - 1; j++) {
      // console.log(params[j])
      if(params[j] > params[j + 1]){
        let arr = params[j]
        params[j] = params[j+1]
        params[j+1] = arr
      }
    }
  }
  return params
}

let params = [4, 2, 3, 1] 
sort(params)
console.log(sort(params))