// 这个webpack的配置文件就是用来打包react全家桶
const path = require('path')
// DllPlugin
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  entry: {
    react: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_dll.js',
    library: '[name]_dll' // 最终会在全局暴露出一个vue_dll的对象
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      // 指定manifest.json的路径
      path: path.resolve(__dirname, '../dist/manifest.json')
    })
  ]
}