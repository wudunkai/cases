<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "../stores/PinIa";
import { Toast, Button } from "vant";
const user = useUserStore();
user.login("321321");
// Toast.loading({
//   duration: 0,
//   forbidClick: true,
//   message: "倒计时 3 秒",
// });
</script>
<template>
  <slot name="user"></slot>
  <Button type="primary">主要按钮</Button>
  <Button type="success">成功按钮</Button>
  <Button type="default">默认按钮</Button>
  <Button type="warning">警告按钮</Button>
  <Button type="danger">危险按钮</Button>
  <slot name="login"></slot>
</template>
