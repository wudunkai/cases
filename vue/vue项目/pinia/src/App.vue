<script setup lang="ts">
import { Button, SubmitBar } from "vant";
import PinIa from "./components/PinIa.vue";
import elTree from "./components/elTree.vue";
import handleUpload from "./components/handleUpload.vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { isReactive, reactive, ref, shallowReactive, toRefs } from "vue";
import axios from "axios";
import CryptoJS from "crypto-js";
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

const locale = ref(zhCn);
const TopImages = ref()

const timestamp = new Date().getTime();
const appid = "szx40a5069b6f5bbe587ff68edfb0b51a6c";
const appSecret = "szxf4717671cace80db140fdc131735e9e96f128555f0bcad7b";
let sourceStr = appid + "," + timestamp + "," + appSecret;
let sign = CryptoJS.SHA256(sourceStr);
axios.get('http://api.shuzhixia.com/szxmain/szx/api/v1/advert/listByParams', {
  headers: {
    appids: appid,
    timestamps: timestamp,
    signs: sign,
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  }
})
  .then((res: any) => {
    TopImages.value = res.data.data
  })
</script>

<template>
  <el-config-provider :locale="locale">
    {{ forms1 }}{{ forms2 }}{{ forms3 }}
    {{ error }}
    <input v-model="error" />
    {{ name }}
    <div v-for="(item, index) in errors" :key="index">
      {{ item }}
      <input v-model="errors[index]" />
    </div>
    <keep-alive>
      <PinIa v-if="error">
        <template #user>user</template>
        <template #login>login</template>
      </PinIa>
    </keep-alive>
    <handleUpload />
    <Button type="primary" @click="Object.assign(forms1, getInitialData());">主要按钮</Button>
    <Button type="success" @click="Object.assign(forms3, getInitialData());">成功按钮</Button>
    <Button type="default">默认按钮</Button>
    <Button type="warning">警告按钮</Button>
    <Button type="danger">危险按钮</Button>
    <SubmitBar :price="3050" button-text="提交订单" />
    <el-popconfirm title="Are you sure to delete this?">
      <template #reference>
        <el-button>Delete</el-button>
      </template>
    </el-popconfirm>
    <elTree></elTree>
    <el-carousel height="400px">
      <el-carousel-item v-for="item in TopImages" :key="item.id">
        <el-image :src="item.image_url" alt></el-image>
      </el-carousel-item>
    </el-carousel>
  </el-config-provider>
</template>

<style>
/* html {
  font-size: 100px;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
