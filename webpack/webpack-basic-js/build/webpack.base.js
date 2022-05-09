const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
// const HappyPack = require('happypack') //版本过期
// 项目分析插件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// webpack的配置文件遵循着commonjs规范
module.exports = {
  // 公共模块 代码分割
  optimization: {
    splitChunks: {
      // 默认 async
      chunks: 'all', // 只对异步加载的模块进行拆分，可选值还有all | initial
      minSize: 0, // 模块最少大于30KB才拆分
      maxSize: 0,  // 模块大小无上限，只要大于30KB都拆分
      minChunks: 1, // 模块最少引用一次才会被拆分
      maxAsyncRequests: 5, // 异步加载时同时发送的请求数量最大不能超过5,超过5的部分不拆分
      maxInitialRequests: 3, // 页面初始化时同时发送的请求数量最大不能超过3,超过3的部分不拆分
      automaticNameDelimiter: '~', // 默认的连接符
      name: true, // 拆分的chunk名,设为true表示根据模块名和CacheGroup的key来自动生成,使用上面连接符连接
      cacheGroups: { // 缓存组配置,上面配置读取完成后进行拆分,如果需要把多个模块拆分到一个文件,就需要缓存,所以命名为缓存组
        vendors: { // 自定义缓存组名
          test: /[\\/]node_modules[\\/]/, // 检查node_modules目录,只要模块在该目录下就使用上面配置拆分到这个组
          priority: -10, // 权重-10,决定了哪个组优先匹配,例如node_modules下有个模块要拆分,同时满足vendors和default组,此时就会分到vendors组,因为-10 > -20
          // filename: 'vendors.js' //动态导入不能添加
        },
        default: { // 默认缓存组名
          minChunks: 2, // 最少引用两次才会被拆分
          priority: -20, // 权重-20
          reuseExistingChunk: true // 如果主入口中引入了两个模块,其中一个正好也引用了后一个,就会直接复用,无需引用两次
        }
      }
    }
  },
  // 入口文件配置
  // 单页面
  // entry: './src/index.js',
  // 多页面
  entry: {
    index: './src/index.js',
    // other: './src/other.js',
    // main: './src/main.js',
  },
  // 出口文件配置
  output: {
    // 必须绝对路径
    // path.resolve(): 解析当前相对路径的绝对路径
    // path: path.resolve('./dist/'),
    // path: path.resolve('__dirname','./dist/'),
    path: path.join(__dirname, '..', './dist/'),
    // filename: 'bundle.js'
    // 多页面
    // filename: '[name].bundle.js',
    // 浏览器缓存
    filename: '[name].[contenthash:8].bundle.js',
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
    // 清除打包目录文件
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
    }),
    // 引入需要的模块
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // manifest文件所在地
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dist/manifest.json')
    // }),
    // // 低于HTML之后 添加js文件插件
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, '../dist/vue_dll.js')
    //   // filepath: path.resolve(__dirname, '../dist/react_dll.js')
    // }),
    // 版本过期
    // new HappyPack({
    //   loaders: [ 'babel-loader' ]
    // })
    // 项目分析插件
    // new BundleAnalyzerPlugin()
  ],
  module: {
    noParse: /jquery|bootstrap/,
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
          // loader: 'happypack/loader' //版本过期
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
        include: path.resolve(__dirname, '../src')
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
}