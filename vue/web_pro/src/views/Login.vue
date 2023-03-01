<script setup>
import { useRouter } from "vue-router";
import api from "@/api";
import { ref } from "vue";
const params = {
  mobile: "wudunkai",
  password:
    "YOrlcLOCFEzWrpcX1rMpk35CxIqoHK2sc+4ZxJ5K0++pvWHMrQDqrFJ2BjdgAB5D+enMxDuJb03djdOeJluc0CFP0fxPJLuhFmup/7BUpF9UNJkvj/4Lt9Cmf72poTxAiHG9WfqEu2YfUdyPzDvkFuotamqCCZjlZE17HeWHT4J5AvFy8DkOOby8uDH5yrdSyoqa7KAd0lMbHYO7O/3fiUMSoMkFcWF94No07DDJBqBGAE52lJNoE4yrXTR+0/KZxhBWRFKr0pPEyW6nI8CohKGDYp1j8Pf6XHasKh6TU3rtAKJB3AUK0H7ALtV2TPH0zzu2mDbenqNmUVxjQltKDA==",
  type: "Win10",
};
const router = useRouter();
const loginText = ref("请先登录");
api
  .request({
    url: "public/login",
    method: "post",
    data: params,
  })
  .then(
    (res) => {
      loginText.value = "登录成功";
      sessionStorage.setItem("Token", res.token);
      setTimeout(() => {
        router.push("/Home");
      }, 2000);
    },
    (err) => {
      console.log(err);
    }
  );
</script>

<template>
  <div class="login">{{ loginText }}</div>
</template>

<style lang="scss">
.login {
  font-size: 28px;
  height: 500px;
  line-height: 500px;
  text-align: center;
}
</style>
