import { registerMicroApps, start } from "qiankun";

const DEV = import.meta.env.DEV;

/**
 * 要注册的微应用
 */
const microApps = [
  {
    name: "vue3", // 微应用名称，具有唯一性，可理解为微应用的唯一id
    entry: DEV ? "//localhost:7001" : "/main/microApps/vue3", // 微应用入口，通过该地址加载微应用
    container: "#container", // 微应用挂载节点，微应用加载完成后将挂载在该节点上
    activeRule: "#/micro/vue3", // 微应用触发的路由规则，触发路由规则后将加载该微应用
    props: {}, // 主应用需要传递给微应用的数据
  },
  {
    name: "react", // 微应用名称，具有唯一性，可理解为微应用的唯一id
    entry: DEV ? "//localhost:7002" : "/main/microApps/react", // 微应用入口，通过该地址加载微应用
    container: "#container", // 微应用挂载节点，微应用加载完成后将挂载在该节点上
    activeRule: "#/micro/react", // 微应用触发的路由规则，触发路由规则后将加载该微应用
    props: {}, // 主应用需要传递给微应用的数据
  },
];

/**
 * 在主应用中注册微应用
 */
registerMicroApps(microApps, {
  beforeLoad: (app: any) => {
    console.log("before load", app.name);
    return Promise.resolve();
  },
});

// 启动qiankun 推荐在页面中开启qiankun
start();
