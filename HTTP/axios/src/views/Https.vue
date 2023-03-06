<script setup lang="ts">
import qs from "qs";
import { getCurrentInstance } from "vue";
// console.log(os);
// 获取接口
const instance = getCurrentInstance();
const api = instance?.appContext.config.globalProperties.$api;
// 登录
const get = (type: string, data?: any) => {
  api[type](data).then((res) => {
    console.log(res);
  });
};
const post = (url: string, data: any) => {
  api[url](data).then((res) => {
    console.log(res);
  });
};
const put = (url: string, data: any) => {
  api[url](data).then((res) => {
    console.log(res);
  });
};
const formData = new FormData();
formData.append("content", JSON.stringify({ name: "tom", pass: 123456 }));
</script>

<template>
  <el-row class="mb-4 h-1/4">
    一般使用接口调用 get 和 post
    <el-divider />
    get方法 从指定的资源请求数据。<br />
    1. 请求可被缓存 <br />
    2. 请求有长度限制 <br />
    3. 请求只应当用于取回数据 <br />
    <el-divider />
    <div>
      <div class="flex">
        <el-button @click="get('get')">不传值</el-button>
        <el-button @click="get('getData', { name: 'tom', pass: 123456 })"
          >传值</el-button
        >
      </div>
      <div class="py-2">
        总体来说，get方法一般用去获取服务器资源数据，不做数据改动 同时
        nodejs后端这边 获取参数 在 query
      </div>
    </div>
    <el-divider />
    post方法 从指定的资源请求数据。<br />
    1. 请求不可被缓存 <br />
    1. 请求对数据长度没有要求 <br />
    2. 请求只应当用于取回数据 <br />
    总体来说，get方法一般用去获取服务器资源数据，不做数据改动 同时
    nodejs后端这边 获取参数 在 body
    <el-divider />
    <el-button
      @click="
        post('post', {
          params: { type: '这是query值', name: 'tom', pass: 123456 },
        })
      "
      >query传值</el-button
    >
    <el-button
      @click="
        post('post', {
          data: { type: '这是body值', name: 'tom', pass: 123456 },
        })
      "
      >json body传值 application/json;charset=UTF-8</el-button
    >
    <el-button
      @click="
        post('post', { data: qs.stringify({ name: 'tom', pass: 123456 }) })
      "
      >表单 body传值 application/x-www-form-urlencoded</el-button
    >
    <el-button
      @click="
        post('post', {
          data: formData,
          headers: {
            'Content-Type':
              'multipart/form-data;boundary=' + new Date().getTime(),
          },
        })
      "
      >表单 body传值 multipart/form-data</el-button
    >
    <el-divider />
    put post 方法<br />
    PUT请求是向服务器端发送数据的（与GET不同）从而改变信息，该请求就像数据库的update操作一样，用来修改数据的内容，但是不会增加数据的种类等，也就是说无论进行多少次PUT操作，其结果并没有不同。
    <el-button
      @click="
        put('put', {
          data: formData,
          headers: {
            'Content-Type':
              'multipart/form-data;boundary=' + new Date().getTime(),
          },
        })
      "
      >表单 body传值 multipart/form-data</el-button
    >
  </el-row>
</template>
