// @ts-check
import { defineStore, acceptHMRUpdate } from "pinia";
import router from "../router";
import { routes } from "../router";
export const useRouteStore = defineStore({
  id: "routes",
  state: () => ({
    userName: "wu",
    routes: [],
  }),
  actions: {
    async addRoute(routes: Array<any>) {
      console.log(router);

      console.log("路由添加前", router.getRoutes());
      //路由未添加之前是3个,我们判断是否添加过，没添加过就添加
      if (router.getRoutes().length === 2) {
        let addRouterList = filterAsyncRouter(
          JSON.parse(JSON.stringify(routes)) //这里深拷贝下，不然会出问题
        );
        addRouterList.forEach((i: any) => {
          console.log("添加路由", i);
          router.addRoute(i);
        });
      }
      console.log("路由添加后", router.getRoutes());
    },
    async login(userName: string) {
      this.$patch({
        userName,
      });
    },
    //注销
    async logout(routerList: Array<any>) {
      return new Promise((resolve) => {
        //拷贝一下
        const delRouterList = JSON.parse(JSON.stringify(routerList));
        //删除添加的路由，如果路由是多层的 递归下。。
        delRouterList.forEach((route: any) => {
          router.removeRoute(route.name);
        });
        //删除路由,清空用户信息
        this.$patch({
          userName: "",
        });
        resolve("注销 success， 清空路由，用户信息");
      });
    },
  },
  // 开启数据缓存
  // 数据默认存在sessionStorage里，并且会以store的id作为key
  persist: {
    enabled: true,
    strategies: [
      {
        key: "my_user",
        storage: localStorage,
        paths: ["name"],
      },
    ],
  },
});
// import component from "../views/Video.vue";
const loadView = (view: any) => {
  // 路由懒加载
  //return (resolve) => require([`@/views/${view}`], resolve) router3版本
  const component = () => import(`../views/${view}.vue`);
  console.log(component);

  return component;
};
//为权限路由异步添加组件
const filterAsyncRouter = (routeList: any) => {
  return routeList.filter((route: any) => {
    // console.log(9, route);
    if (route.component) {
      // 如果不是布局组件就只能是页面的引用了
      // 利用懒加载函数将实际页面赋值给它
      route.component = loadView(route.component);
      // 判断是否存在子路由，并递归调用自己
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children);
      }
      return true;
    }
  });
};

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRouteStore, import.meta.hot));
}
