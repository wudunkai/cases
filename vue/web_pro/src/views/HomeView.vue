<script setup>
import { ref } from "vue";
import UploadBtn from "@/components/UploadBtn/UploadBtn.vue";
import ProcessOpinion from "@/components/ProcessOpinion/ProcessOpinion.vue";
const params = {
  itemid: 125585,
  processcode: "ywsp_dy",
};
const uploadParams = {
  // 上传按钮文字描述
  buttonText: "添加文件",
  // 上传参数
  uploadParams: {
    itemid: "",
    type: "ywzl",
    filelx: "0111",
  },
  // 上传格式
  accept:
    "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};
const uploadError = (data) => {
  console.log(data);
};
const uploadSuccess = (data) => {
  console.log(data);
};
const value = ref(
  "gpt 使用van-field的readonly属性，将文本框设置为只读，然后使用van-cell-group组件将文本框包裹起来，无法实现文本框内容超出手机屏幕不能拖动的效果。"
);
</script>

<template>
  <UploadBtn
    @upload-error="uploadError"
    @upload-success="uploadSuccess"
    v-bind="uploadParams"
  />
  <ProcessOpinion :params="params" />
  <van-cell-group inset>
    <van-field
      v-model="value"
      disabled
      label="文本"
      placeholder="请输入用户名"
    />
  </van-cell-group>
</template>
