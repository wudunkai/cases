# axios

## axios 是什么

1. 基于 promise 封装的 http 请求库(避免回调地狱)
2. 支持浏览器和 node 端
3. 丰富的配置项：数据转换器，拦截器等等
4. 客户端支持防御 sxrf
5. 生态完善(支持 vue/react，周边插件等等)

## axios 目录格式

    adapters // 适配器，兼容xhr和node
    cancel // 取消请求
    core // 核心源码，包含拦截器等
    helpers // 辅助方法
    axios.js // 入口文件
    default.js // 默认配置
    utils.js // 公共工具方法
