// function double (x) {
//   return x + x  
// }
// function add (x, y) {
//   return x + y
// }

// function boundScore(min, max, score) { 
//   return Math.max(min, Math.min(max, score));
// }

// let person = { score: 25 };

// let newScore = person.score
//   |> double
//   |> (_ => add(7, _))
//   |> (_ => boundScore(0, 100, _));

// 前者结合
// let newScore = person.score
//   |> double
//   |> add(7, ?)
//   |> boundScore(0, 100, ?);

// newScore




// const double = (n) => n * 2;
// const increment = (n) => n + 1;

// 没有用管道操作符
// double(increment(double(5))); // 22

// 用上管道操作符之后
// 5 |> double |> increment |> double; // 22