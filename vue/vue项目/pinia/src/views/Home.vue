<script lang="ts" setup>
import { ref } from "vue";
import router from "../router";
const menuList = ref();
const routerList = router.getRoutes();
menuList.value = routerList.filter((route) => {
  const isSidebar = route.meta.isSideBar ? route.meta.isSideBar : 0;
  if (isSidebar) {
    return route;
  }
});
</script>
<template>
  <router-view></router-view>
  <div>主页</div>
  <router-link v-for="(item, index) in menuList" :key="index" :to="item.path">{{
    item.name
  }}</router-link>
</template>
