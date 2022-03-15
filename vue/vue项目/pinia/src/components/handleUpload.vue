<script setup lang="ts">
import { computed, reactive, watch, ref } from "vue";
import axios from "axios";
import _ from "lodash";
const CancelToken = axios.CancelToken;
let source = CancelToken.source();
function axiosRequest({
  url,
  data,
  headers = {},
  onUploadProgress = (e: any) => e, // 进度回调
}: any) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers,
        onUploadProgress, // 传入监听进度回调
        cancelToken: source.token,
      })
      .then((res: any) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
}
// 暂停
const pauseUpload = () => {
  source.cancel("中断上传");
  source = CancelToken.source();
};

const fileObj: any = reactive({ file: null, chunkList: [] });
// 继续传
const keepUpload = async () => {
  const { uploadedList } = await verifyUpload(fileObj.file.name);
  uploadChunks(uploadedList);
};
const totalPercent = computed(() => {
  const fileObjs = fileObj;
  if (fileObjs.chunkList.length === 0) return 0;
  const loaded = fileObjs.chunkList
    .map(({ size, percent }: any) => size * percent)
    .reduce((pre: any, next: any) => pre + next);
  return parseInt((loaded / fileObj.file.size).toFixed(2));
});
// 进度条
const tempPercent = ref(0);
watch(
  () => totalPercent.value,
  (newVal) => {
    if (newVal > tempPercent.value) tempPercent.value = newVal;
  }
);
const handleFileChange = (e: any) => {
  const [file] = e.target.files;
  if (!file) return;
  fileObj.file = file;
};
const handleUpload = async () => {
  const fileObjs: any = fileObj;
  if (!fileObjs.file) return;
  const { shouldUpload } = await verifyUpload(fileObj.file.name);
  if (!shouldUpload) {
    alert("秒传：上传成功");
    return;
  }
  const chunkList = createChunk(fileObjs.file);
  fileObj.chunkList = chunkList.map(({ file }, index) => ({
    file,
    size: file.size,
    percent: 0,
    chunkName: `${fileObjs.file.name}-${index}`,
    fileName: fileObjs.file.name,
    index,
  }));
  uploadChunks([]); // 执行上传切片的操作
};
const verifyUpload = async (fileName: string) => {
  const { data }: any = await axiosRequest({
    url: "http://localhost:3001/verify",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({ fileName }),
  });
  return data;
};
const uploadChunks = async (uploadedList: Array<any>[]) => {
  const keepList = uploadedList.map(
    (item: any) =>
    (item = {
      chunkName: item,
    })
  );
  console.log(fileObj.chunkList, keepList);
  const requestList = _.differenceBy(fileObj.chunkList, keepList, "chunkName");
  const requestLists = requestList
    .map(({ file, fileName, index, chunkName }: any) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      formData.append("chunkName", chunkName);
      return { formData, index };
    })
    .map(({ formData, index }: any) =>
      axiosRequest({
        url: "http://localhost:3001/upload",
        data: formData,
        onUploadProgress: createProgressHandler(fileObj.chunkList[index]), // 传入监听上传进度回调
      })
    );
  await Promise.all(requestLists); // 使用Promise.all进行请求
  mergeChunks();
};
const mergeChunks = (size = 5 * 1024 * 1024) => {
  axiosRequest({
    url: "http://localhost:3001/merge",
    headers: {
      "content-type": "application/json",
    },
    data: JSON.stringify({
      size,
      fileName: fileObj.file.name,
    }),
  });
};
const createProgressHandler = (item: any) => {
  return (e: any) => {
    // 设置每一个切片的进度百分比
    item.percent = parseInt(String((e.loaded / e.total) * 100));
  };
};
const createChunk = (file: any, size = 5 * 1024 * 1024) => {
  const chunkList = [];
  let cur = 0;
  while (cur < file.size) {
    // 使用slice方法切片
    chunkList.push({ file: file.slice(cur, cur + size) });
    cur += size;
  }
  return chunkList;
};
</script>

<template>
  <input type="file" @change="handleFileChange" />
  <el-button @click="handleUpload">上传</el-button>
  <el-button @click="pauseUpload">暂停</el-button>
  <el-button @click="keepUpload">续传</el-button>
  <div style="width: 300px">
    总进度：
    <el-progress :percentage="totalPercent"></el-progress>切片进度：
    <div v-for="item in fileObj.chunkList" :key="item">
      <span>{{ item.chunkName }}：</span>
      <el-progress :percentage="item.percent"></el-progress>
    </div>
  </div>
  {{ tempPercent }}
  <el-progress :percentage="tempPercent"></el-progress>
</template>
