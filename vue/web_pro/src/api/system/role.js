export default {
  // 获取岗位列表
  role: {
    url: "role/list",
    method: "post"
  },
  // 新增高位
  addRole: {
    url: "role/save",
    method: "post"
  },
  // 保存岗位
  updateRole: {
    url: "role/update",
    method: "post"
  },
  // 删除岗位
  deleteRole: {
    url: "role/delete",
    method: "post"
  },
  // 禁用岗位
  disabledRole: {
    url: "role/disable",
    method: "post"
  },
  // 启用岗位
  enableRole: {
    url: "role/enable",
    method: "post"
  },
  // 获取岗位关联菜单列表
  getRoleMenu: {
    url: "role/listInfo",
    method: "post"
  },
  // 岗位关联菜单
  roleBindMenu: {
    url: "role/bind",
    method: "post"
  }
};