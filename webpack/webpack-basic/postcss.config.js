module.exports = {  
  plugins: [
    require('autoprefixer')({
      // webpack4.x 安装postcss-loader 配合 autoprefixer 解决css3的兼容性
      "browsers": [
        "defaults",
        "not ie < 11",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    })
  ]
}