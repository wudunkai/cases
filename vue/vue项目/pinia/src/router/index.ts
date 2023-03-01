import { useRouteStore } from "./../stores/PinIa";
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/Editor",
    name: "Editor",
    component: () => import("../views/Editor.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export const authRouter = [
  {
    path: "/video",
    name: "video",
    component: "Video",
    meta: {
      isSideBar: 1,
    },
  },
];

router.beforeEach(async (to, from, next) => {
  //获取用户信息
  console.log(router);

  const Routes = useRouteStore();
  let { userName } = Routes;
  // console.log("用户角色", userName ? userName : "未登陆");
  //有用户信息
  if (userName) {
    //触发添加路由方法，里面会判断是否需要添加
    await Routes.addRoute(authRouter);
    //根据to.name来判断是否为动态路由, 是否有人知道还有更好的判断方法？
    console.log(to.name);
    if (!to.name) {
      //当前路由是动态的，确定是有的, 有就跳自己，没有就跳404,, tip: 刷新后动态路由的to.name为空
      if (authRouter.findIndex((i) => i.path === to.path) !== -1) {
        next({ ...to, replace: true });
      } else {
        next();
      }
    } else {
      console.log(28, router.getRoutes());
      next();
    }
  } else {
    next();
  }
});

export default router;
