const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

// webpack的配置文件遵循着commonjs规范
module.exports = {
  // 入口文件配置
  // 单页面
  entry: './src/main.js',
  // 多页面
  // entry: {
  //   index: './src/index.js',
  //   other: './src/other.js',
  //   main: './src/main.js',
  // },
  // 出口文件配置
  output: {
    // 必须绝对路径
    // path.resolve(): 解析当前相对路径的绝对路径
    // path: path.resolve('./dist/'),
    // path: path.resolve('__dirname','./dist/'),
    path: path.join(__dirname, '..', './dist/'),
    // filename: 'bundle.js'
    // 多页面
    filename: '[name].js',
    publicPath: '/'
  },
  // 默认为production,
  // mode: 'production',
  // mode: 'development',
  // 开启监视模式,此时执行webpack指令进行打包会监视文件变化自动打包
  // watch: true
  // devServer: {
  //   // 端口
  //   port: 8090,
  //   // 自动打开
  //   open: true,
  //   // 4.3.0不需要安装插件
  //   hot: true,
  //   compress: true,
  //   // contentBase: './src'
  // },
  // html也hot更新
  // 1. devServer时根据模板在express项目根目录下生成html文件(类似于devServer生成内存中的bundle.js)
  // 2. devServer时自动引入bundle.js
  // 3. 打包时会自动生成index.html
  plugins: [
    // 单页面
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    // 多页面
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: './src/index.html',
    //   chunks: ['index','main']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'other.html',
    //   template: './src/other.html',
    //   // chunks: ['index','other']
    //   chunks: ['other']
    // }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'assets'),
        to: 'assets'
      }
    ]),
    // 版权信息
    new webpack.BannerPlugin('测试这一段话'),
    // 创建插件对象 自动加载jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // css压缩
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      // 配置的是用来解析.css文件的loader(style-loader和css-loader)
      {
        // 用正则匹配当前访问的文件的后缀名是  .css
        test: /\.css$/,
        // css-loader: 解析css文件
        // style-loader: 将解析出来的结果，放到HTML中，使其生效
        // use: ['style-loader', 'css-loader'] // webpack底层调用这些包的顺序是从右到左
        // 配置style-loader MiniCssExtractPlugin.loader
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
      // { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.s(a|c)ss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
      {
        test: /\.(jpg|jpeg|png|bmp|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule:false,
            limit: 5 * 1024,
            // 输入的路径
            outputPath: 'images',
            name: '[name]-[hash:4].[ext]'
          }
        }
      },
      // 文字图片
      { test: /\.(woff|woff2|eot|svg|ttf)$/, use: 'url-loader' },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // 放入.babelrc
          // options: {
          //   presets: ['@babel/env'],
          //   plugins: [
          //     '@babel/plugin-proposal-class-properties',
          //     '@babel/plugin-transform-runtime'
          //   ]
          // }
        },
        exclude: /node_modules/,
      },
      // html
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      // 配置loader 将库引入到全局作用域
      // {
      //   // 用于解析jquery模块的绝对路径
      //   test: require.resolve('jquery'),
      //   use: {
      //     loader: 'expose-loader',
      //     options: '$'
      //   }
      // }
    ]
  },
  // devtool: 'cheap-module-eval-source-map'
}