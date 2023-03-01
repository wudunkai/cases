export default {
  // 获取用户信息
  permission_list: {
    url: "user/permission_list",
    method: "post"
  },
  // 根据菜单id获取报表链接
  byMenuId: {
    url: "reportUrl/byMenuId",
    method: "get"
  },
  fetchList: {
    url: "user/list",
    method: "post"
  },
  getDeptTree: {
    url: "enterprise/treeList",
    method: "post"
  },
  createUser: {
    url: "user/save",
    method: "post"
  },
  updateUser: {
    url: "user/update",
    method: "post"
  },
  deleteUser: {
    url: "user/deleteBatch",
    method: "post"
  },
  disabled: {
    url: "user/disabled",
    method: "post"
  },
  operRole: {
    url: "user/operRole",
    method: "post"
  },
  enable: {
    url: "user/enable",
    method: "post"
  },
  role: {
    url: "role/list",
    method: "post"
  },
  // 用户管理中的状态
  userstater: {
    url: "user/init",
    method: "get"
  },
  // 用户启用
  userenable: {
    url: "user/enable",
    method: "post"
  },
  // 用户禁用
  userdisabled: {
    url: "user/disabled",
    method: "post"
  },
  // 用户修改密码
  userupdatePassword: {
    url: "user/updatePassword",
    method: "post"
  },
  // 获取最上级信息
  getBasicsOrgList: {
    url: "enterprise/getBasicsOrg",
    method: "get"
  }
};
