const path = require('path')
// webpack的配置文件遵循着commonjs规范
module.exports = {
  // 入口文件配置
  entry: './src/main.js',
  // 出口文件配置
  output: {
    // 必须绝对路径
    // path.resolve(): 解析当前相对路径的绝对路径
    // path: path.resolve('./dist/'),
    // path: path.resolve('__dirname','./dist/'),
    path: path.join(__dirname, './dist/'),
    filename: 'bundle.js'
  },
  mode: 'production',
  // mode: 'development'
}