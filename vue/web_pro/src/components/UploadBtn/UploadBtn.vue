<script setup>
import api from "@/api";
import { ref } from "vue";
// 父组件传值
const props = defineProps({
  // 上传按钮文字描述
  buttonText: {
    type: String,
    default: "选择附件",
  },
  // 是否自动上传附件
  autoUpload: {
    type: Boolean,
    default: true,
  },
  // 上传接口
  action: {
    type: String,
    default: "file/fileUpload",
  },
  // 上传参数
  uploadParams: {
    type: Object,
    default: () => ({}),
  },
  // 上传数量
  multiple: {
    type: Number,
    default: 1,
  },
  // 上传格式
  accept: {
    type: String,
    default: "image/*",
  },
});
// 事件传递
const emit = defineEmits(["change", "upload-success", "upload-error"]);
const btnLoading = ref(false);
const fileInput = ref("");
//选择附件
const changeFile = (e) => {
  const files = e.target.files;
  if (props.autoUpload) uploadFile(files);
  else emit("change", files);
  e.target.value = null;
};
//上传附件
const uploadFile = (files) => {
  const params = new FormData();
  for (let i = 0; i < files.length; i++)
    params.append(`file${i + 1}`, files[i]);
  Object.entries(props.uploadParams).forEach(([key, value]) => {
    params.append(key, value);
  });
  btnLoading.value = true;
  api
    .request({
      url: props.action,
      method: "post",
      data: params,
    })
    .then(
      (res) => {
        emit("upload-success", res);
      },
      (err) => {
        emit("upload-error", err);
      }
    )
    .finally(() => {
      btnLoading.value = false;
    });
};
</script>

<template>
  <el-button
    size="small"
    type="primary"
    :loading="btnLoading"
    @click="fileInput.click()"
    >{{ buttonText }}</el-button
  >
  <input
    v-show="false"
    ref="fileInput"
    type="file"
    :multiple="multiple"
    :accept="accept"
    @change="changeFile"
  />
</template>
