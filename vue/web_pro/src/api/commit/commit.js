export default {
  // 获取表格数据
  getData: {
    url: "wfProcessBusiness/getWfProcessBusinessByUserid",
    method: "get"
  },
  // 获取提交窗口左侧流程数据
  getSubmitData: {
    url: "wfProcessBusiness/pretreatmentSubmit",
    method: "post"
  },
  // 获取提交窗口左侧流程数据
  getReBackData: {
    url: "wfProcessBusiness/pretreatmentReBack",
    method: "post"
  },
  // 获取提交窗口左侧流程数据
  getReturnSubmitData: {
    url: "wfProcessBusiness/pretreatmentSubmitForReturn",
    method: "post"
  },
  // 获取退回人员信息数据
  getReturnUsers: {
    url: "wfProcessBusiness/getReturnUsers",
    method: "get"
  },
  // 获取提交窗口右侧人员数据
  getProcessUser: {
    url: "wfProcessUser/getWfProcessUserByTypeAndIds",
    method: "get"
  },
  // 提交提交窗口信息
  setCommitData: {
    url: "wfProcessBusiness/updatewf",
    method: "post"
  },
  // 追回待办
  findAndPickBackWf: {
    url: "wfProcessBusiness/pickBackwf",
    method: "post"
  },
  // 提交提交窗口信息
  setRebackData: {
    url: "wfProcessBusiness/reBackwf",
    method: "post"
  },
  // 提交办结信息
  setFinishData: {
    url: "wfProcessBusiness/updateFinish",
    method: "post"
  },
  //发起流程左侧流程数据
  getNewProcess: {
    url: "wfProcessBusiness/pretreatmentSubmitByInsert",
    method: "post"
  },
  // 新增提交流程
  submitNewProcess: {
    url: "wfProcessBusiness/saveWfProcessBusinessAndSubmit",
    method: "post"
  },
  // 发起流程点意见框的确定按钮
  findNodeByDec: {
    url: "wfProcessBusiness/findNodeByDec",
    method: "get"
  },
  // 批量提交流程
  updatewfForbatch: {
    url: "wfProcessBusiness/updatewfForbatch",
    method: "post"
  },
  // 批量或单个激活流程 通用
  activeNewBusinessProcess: {
    url: "wfProcessBusiness/activeNewBusinessProcess",
    method: "post"
  },
  // 批量新增提交流程
  addNewProcess: {
    url: "wfProcessBusiness/saveWfProcessBusinessAndSubmitForbatch",
    method: "post"
  },
  saveWfUsualOpinion: {
    url: "wfUsualOpinion/saveOpinion",
    method: "post"
  },
  findWfUsualOpinion: {
    url: "wfUsualOpinion/find",
    method: "get"
  },
  delWfUsualOpinion: {
    url: "wfUsualOpinion/delete",
    method: "get"
  },
  setPickDefaultWfUsualOpinion: {
    url: "wfUsualOpinion/ischeck",
    method: "get"
  },
  // 获取流程节点按钮信息
  findprocessbtnByaiId: {
    url: "wfProcessBusiness/findNodeButtons",
    method: "get"
  },
  // 流程公共办结方法
  finishWf: {
    method: "get"
  },
  // 提交后查询流程状态回调信息
  findWfStatusAction: {
    url: "wfProcessBusiness/findProcessAction",
    method: "get"
  },
  // 流程状态回调方法
  doWfStatusAction: {
    method: "post"
  },
  testDrools: {
    url: "dRools/runRule",
    method: "post"
  },
  //根据字典类型code获取字典数据
  getBasicDataByCode: {
    url: "basicData/getBasicDataByCode",
    method: "get"
  },
  getDeciData: {
    url: "wfProcessDecisionEntity/getDeciData",
    method: "get"
  },
  //生成保函
  saveGuaranteeLetters: {
    url: "afgGuaranteeLetter/saveGuaranteeLetters",
    method: "post"
  },
  //生成保函
  changeLettersDoc2pdf: {
    url: "afgGuaranteeLetter/tranToPdf",
    method: "post"
  },
  // 追偿跟踪办结前
  getRecoveryIsFinish: {
    url: "recovery/getRecoveryIsFinish",
    method: "post"
  },
  dealFinishSt: {
    url: "wfProcessBusiness/dealFinishSt",
    method: "get"
  }
};
