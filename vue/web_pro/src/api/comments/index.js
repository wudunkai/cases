// 流程信息接口
import request from "../request";

export default {
  // 获取流程信息
  getProcessInformation (params) {
    return request({
      url: "/wfProcessBusiness/getProcessInformation",
      method: "get",
      params
    });
  }
};