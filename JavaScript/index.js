function Counter() {
  let start = Date.now()
  this.num = 0
  this.timer1 = setInterval(() => {
    this.num++
    let gap = Date.now() - start
    clearInterval(this.timer1)
    console.log('timer1', this.num, gap)
  }, 996);
  JSON.parse('{"desc":"..."}')
  this.timer2 = setInterval(() => {
    this.num++
    let gap = Date.now() - start
    clearInterval(this.timer2)
    console.log('timer2', this.num, gap)
  }, 0);
}
Counter()