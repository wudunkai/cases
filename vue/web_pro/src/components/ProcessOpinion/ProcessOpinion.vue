<script setup>
import api from "@/api/comments";
import { reactive, watch } from "vue";
// 表格内容
const gridOptions = reactive({
  border: true,
  size: "mini",
  autoResize: true,
  align: "center",
  tooltipConfig: {
    showAll: true,
    theme: "light",
    contentMethod: ({ row, column }) => {
      if (row && column) {
        let text = row[column.property];
        return text;
      }
    },
  },
  // 标头
  columns: [
    {
      type: "seq",
      title: "序号",
      align: "center",
      width: 60,
    },
    {
      field: "startTime",
      title: "到达时间",
      align: "center",
      width: 150,
    },
    {
      field: "endTime",
      title: "响应时间",
      align: "center",
      width: 150,
    },
    {
      field: "nodename",
      title: "审批环节",
      align: "center",
      width: 130,
    },
    {
      field: "username",
      title: "审批人",
      align: "center",
      width: 100,
    },
    {
      field: "decName",
      title: "决策选项",
      align: "center",
      width: 120,
    },
    {
      field: "opinion",
      title: "审批意见",
      type: "expand",
      align: "left",
      headerAlign: "center",
      slots: {
        default: "opinion",
        content: "expandOpinion",
      },
    },
  ],
  expandConfig: {
    labelField: "opinion",
  },
  // 表单内容数据
  data: [],
});
// 父组件传值
const props = defineProps({
  params: {
    type: Object,
    default: null,
  },
});
// 获取流程意见数据
const getData = () => {
  if (props.params !== null) {
    api.getProcessInformation(props.params).then((data) => {
      gridOptions.data = data;
    });
  }
};
// 监听改变值
watch(
  () => props.params,
  () => {
    getData();
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<template>
  <vxe-grid v-bind="gridOptions">
    <template #opinion="{ row }">
      <el-tag v-if="row.aiType === 1" type="danger">退回</el-tag>
      <el-tag v-else-if="row.endTime" type="success">提交</el-tag>
      {{ row.opinion }}
    </template>
    <template #expandOpinion="{ row }">
      <div class="expand-container">
        审批意见：
        <vxe-textarea
          resize="vertical"
          v-model="row.opinion"
          disabled
          autosize
        ></vxe-textarea>
        <!-- <div class="expand-title">审批意见：</div>
            :autosize="property.params.autosize"
          <div class="expand-content">{{row.opinion}}</div> -->
      </div>
    </template>
  </vxe-grid>
</template>

<style lang="scss">
.vxe-table--tooltip-wrapper {
  font-size: 18px;
}
.expand-container {
  box-sizing: border-box;
  padding: 5px 20px;
  display: grid;
  grid-template-columns: 4% 96%;
  width: 100%;
  align-items: center;
}
</style>
