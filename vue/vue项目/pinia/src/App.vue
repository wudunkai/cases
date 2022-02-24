<script setup lang="ts">
import { Button } from "vant";
import PinIa from "./components/PinIa.vue";
import handleUpload from "./components/handleUpload.vue";
import { isReactive, reactive, ref, shallowReactive, toRefs } from "vue";
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

const forms1 = reactive({
  name: "",
  pass: "",
  car: {
    name: "1",
  },
});
const forms2 = shallowReactive({
  name: "",
  pass: "",
  car: {
    name: "1",
  },
});
isReactive(forms1.car);
isReactive(forms1.car);
// setTimeout(() => {
//   forms1.car.name = "2";
//   forms2.car.name = "2";
// }, 1000);
</script>

<template>
  {{ forms1 }}{{ forms2 }}
  {{ error }}
  <input v-model="error" />
  {{ name }}
  <div v-for="(item, index) in errors" :key="index">
    {{ item }}
    <input v-model="errors[index]" />
  </div>
  <PinIa>
    <template #user>user</template>
    <template #login>login</template>
  </PinIa>
  <handleUpload />
  <Button type="primary">主要按钮</Button>
  <Button type="success">成功按钮</Button>
  <Button type="default">默认按钮</Button>
  <Button type="warning">警告按钮</Button>
  <Button type="danger">危险按钮</Button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
