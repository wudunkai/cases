const path = require('path')
const HelloWorldPlugin = require('./plugins/HelloWorldPlugin.js')
const HTMLPlugin = require('./plugins/HTMLPlugin.js')

module.exports = {
  entry: './src/index.js',
  output:{
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HelloWorldPlugin(),
    // new HTMLPlugin({
    //   filename: 'index.html',
    //   template: './src/index.html'
    // })
  ],
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: {
          loader: './loaders/loader1.js',
          options: {
            name: '后天'
          }
        }, 
        enforce: 'pre' 
      },
      // loader的加载顺序永远遵循： pre > inline > normal > post
      // { test: /\.js$/, use: './loaders/loader1.js', enforce: 'pre' },
      // { test: /\.js$/, use: './loaders/loader2.js' },
      // { test: /\.js$/, use: './loaders/loader3.js', enforce: 'post' },
      // { 
      //   test: /\.js$/, 
      //   use: [
      //     './loaders/loader1.js',
      //     './loaders/loader2.js',
      //     './loaders/loader3.js'
      //   ]
      // },
    ]
  },
  mode: 'development',
}