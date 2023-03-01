export default {
  // 查找流程
  findWfProcessInfoS: {
    url: "WfProcessInfo/findWfProcessInfoS",
    method: "post"
  },
  getProcessById: {
    url: "WfProcessInfo/getProcess",
    method: "post"
  },
  getRuleFileByProcessId: {
    url: "WfProcessInfo/getRuleFileByProcessId",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "post"
  },
  saveNode: {
    url: "WfProcessNodes/saveNode",
    headers: { "Content-Type": "application/json" },
    method: "post"
  },
  updateRuleDetail: {
    url: "WfProcessNodes/updateRuleDetail",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    method: "post"
  },
  saveLine: {
    url: "WfProcessLine/updateLine",
    headers: { "Content-Type": "application/json" },
    method: "post"
  },
  findLine: {
    url: "WfProcessLine/findEnLinesByEl",
    method: "post"
  },
  deleteNode: {
    url: "WfProcessNodes/deleteProcessNodes",
    headers: { "Content-Type": "application/json" },
    method: "post"
  },
  deleteLine: {
    url: "WfProcessLine/deleteEnLine",
    headers: { "Content-Type": "application/json" },
    method: "post"
  },
  // 取得节点序列id
  getNodeId: {
    url: "WfProcessNodes/getWfProcessNodesId",
    method: "get"
  },
  // 保存流程信息
  saveProcessInfo: {
    url: "WfProcessInfo/saveWfProcessInfo",
    method: "post"
  },
  // 获取参与类型
  getAllWfProcessUserType: {
    url: "wfProcessUser/getAllWfProcessUserType",
    method: "get"
  },
  // 根据类型获取数据
  getWfProcessUserByType: {
    url: "wfProcessUser/getWfProcessUserByType",
    method: "get"
  },
  // 获取决策选项
  getDeciData: {
    url: "wfProcessDecisionEntity/getDeciData",
    method: "get"
  },
  // 获取流程状态
  findStatusByProid: {
    url: "wfProcessStatus/findStatusByProid",
    method: "get"
  },
  // 规则配置
  getProcessRuleList: {
    url: "ruleFile/processRuleList",
    method: "get"
  }
};
