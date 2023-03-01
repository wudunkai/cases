export default {
  // 上传附件
  fileUpload: {
    url: "file/fileUpload",
    method: "post"
  },
  // 查询附件信息
  getFileListByItemidAndType: {
    url: "file/getFileListByItemidAndType",
    method: "get"
  },
  // 根据附件类型查询附件
  getfilesbytype: {
    url: "file/getfilesbytype",
    method: "post"
  },
  // 下载附件
  downLoadFile: {
    url: "file/downLoadFile",
    method: "get",
    responseType: "blob"
  },
  // 删除附件
  deleteAttachmentByGuid: {
    url: "file/deleteAttachmentByGuid",
    method: "post"
  },
  // 获取附件类型
  getSysData: {
    url: "sysdict/getSysData",
    method: "post"
  },
  // 获取所有附件
  getfilesbyitemid: {
    url: "file/getfilesbyitemid",
    method: "post"
  },
  // 上传进度
  getUploadStatus: {
    url: "file/getUploadStatus",
    method: "post"
  }
};
