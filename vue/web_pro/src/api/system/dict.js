export default {
  // 获取字典数据
  selectDictTree: {
    url: "basicData/selectDictTree",
    method: "post"
  },
  // 获取字典数据
  selectDictTree2: {
    url: "basicData/DictTree",
    method: "post"
  },
  // 获取右侧常用名表格数据
  getBasicData: {
    url: "basicData/getBasicData",
    method: "get"
  },
  // 保存字典数据
  saveBasicData: {
    url: "basicData/saveBasicData",
    method: "post"
  },
  deleteData: {
    url: "basicData/deleteBasic",
    method: "post"
  },
  // 常用名保存
  batchSave: {
    url: "/basicData/saveBasicDataList",
    method: "post"
  }
};
