<script lang="ts" setup>
import { Button, SubmitBar } from "vant";
import { reactive, ref, shallowReactive, toRefs } from "vue";
import { authRouter } from '../router'
import { useRouteStore } from "../stores/PinIa";
const form: any = {
  error: ref<string>("aaa"),
  errors: reactive({
    name: "1",
    password: "2",
  }),
};
const { error, errors } = form;
const { name } = toRefs(form.errors);
// console.log(name, form.errors);
const getInitialData = () => ({
  name: "",
  pass: "",
  car: {
    name: "1",
  },
})
const forms1 = reactive(getInitialData());
const forms2 = shallowReactive({
  name: "",
  pass: "",
  car: {
    name: "1",
  },
});
const forms3 = ref(getInitialData());
setTimeout(() => {
  forms1.car.name = "2";
  forms2.car.name = "2";
  forms3.value.car.name = "2";
}, 1000);

const useRouteStores = useRouteStore()
const onSubmit = () => {
  //触发登陆，保存信息，添加路由
  useRouteStores.logout(authRouter)
}
const onLogin = () => {
  //触发登陆，保存信息，添加路由
  useRouteStores.login('wu')
}
</script>
<template>
  {{ forms1 }}{{ forms2 }}{{ forms3 }}
  {{ error }}
  <input v-model="error" />
  {{ name }}
  <div v-for="(item, index) in errors" :key="index">
    {{ item }}
    <input v-model="errors[index]" />
  </div>
  <Button type="primary" @click="Object.assign(forms1, getInitialData());">主要按钮</Button>
  <Button type="success" @click="Object.assign(forms3, getInitialData());">成功按钮</Button>
  <Button type="default" @click="onSubmit()">默认按钮</Button>
  <Button type="warning" @click="onLogin()">警告按钮</Button>
  <Button type="danger">危险按钮</Button>
  <SubmitBar :price="3050" button-text="提交订单" />
  <router-link to="/home">home</router-link>
</template>