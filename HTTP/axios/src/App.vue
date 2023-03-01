<script setup lang="ts">
import Axios from "axios";
import { getCurrentInstance, ref } from "vue";
// console.log(os);
// 获取接口
const instance = getCurrentInstance();
const api = instance?.appContext.config.globalProperties.$api;
// 登录
const login = () => {
  api.login({ name: "tom", pass: 123456 }).then((res) => {
    console.log(res);
  });
};
// 退出
const logout = () => {
  api.logout().then((res) => {
    console.log(res);
  });
};
// 获取列表
const list = ref();
const getList = () => {
  let fn1 = api.getList(true);
  let fn2 = api.getList({ name: "tom" }, true);
  Axios.all([fn1, fn2]).then(
    Axios.spread((res1, res2) => {
      console.log(res1, res2);
      // console.log("一秒后获取到数据");
      if (res1.statusCode == 1 && res2.statusCode == 1)
        list.value = [...res1.data, ...res2.data];
    })
  );
};
</script>

<template>
  <el-row class="mb-4">
    <el-button @click="login">登录</el-button>
    <el-button @click="logout">退出</el-button>
    <el-button @click="getList">获取信息</el-button>
  </el-row>
</template>
