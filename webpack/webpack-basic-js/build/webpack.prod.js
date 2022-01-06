const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')


// webpack的配置文件遵循着commonjs规范
module.exports = merge(baseConfig, {
  // 默认为production,
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      IS_DEV: 'false',
    })
  ],
  // 开启css压缩
  optimization: {
    minimizer: [
      // 删除js不会压缩
      new TerserJSPlugin({}), 
      new OptimizeCSSAssetsPlugin({})
    ],
  },
})