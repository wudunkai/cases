# axios

## axios 是什么

1. 基于 promise 封装的 http 请求库(避免回调地狱)
2. 支持浏览器和 node 端
3. 丰富的配置项：数据转换器，拦截器等等
4. 客户端支持防御 XSRF
5. 生态完善(支持 vue/react，周边插件等等)

## axios 目录格式

    adapters // 适配器，兼容xhr和node
    cancel // 取消请求
    core // 核心源码，包含拦截器等
    helpers // 辅助方法
    axios.js // 入口文件
    default.js // 默认配置
    utils.js // 公共工具方法

## axios 执行流程

    axios.create 创建单独实例，或直接使用 axios 实例(axios/axios.get…)
    request 方法是入口，axios/axios.get 等调用都会走进 request 进行处理
    请求拦截器
    请求数据转换器，对传入的参数 data 和 header 做数据处理，比如 JSON.stringify(data)
    适配器，判断是浏览器端还是 node 端，执行不同的方法
    响应数据转换器，对服务端的数据进行处理，比如 JSON.parse(data)
    响应拦截器，对服务端数据做处理，比如 token 失效退出登陆，报错 dialog 提示
    返回数据给开发者

流程大致图

<img src="D:\xiangmu\wudunkai-cases\cases\HTTP\axios\bd315c6034a85edfe6ef3e6b35a1c82bdc547511.jpeg" alt="bd315c6034a85edfe6ef3e6b35a1c82bdc547511" style="zoom:75%;" />

​		
