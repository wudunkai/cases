const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/'
}));

app.listen(3000, function () {
  console.log('http://localhost:3000');
});

// 只有在开发时才需要使用自动编译工具, 例如: webpack-dev-server
// 项目上线时都会直接使用webpack进行打包构建, 不需要使用这些自动编译工具
// 自动编译工具只是为了**提高开发体验**