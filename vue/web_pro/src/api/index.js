import MyServer from "./MyServer";

import User from "./user/user";
import Dict from "./dict/dict";
import Flow from "./flow/flow";
import Menu from "./system/menu";
import Role from "./system/role";
import SystemDict from "./system/dict";
import Commit from "./commit/commit";
import Upload from "./upload/upload";
import Relate from "./relate/relate";

// 用户
MyServer.setRequest("User", User);
// 字典
MyServer.setRequest("Dict", Dict);
// 流程
MyServer.setRequest("Flow", Flow);
// 菜单管理
MyServer.setRequest("Menu", Menu);
// 岗位管理
MyServer.setRequest("Role", Role);
// 系统管理-字典
MyServer.setRequest("SystemDict", SystemDict);
// 提交流程
MyServer.setRequest("Commit", Commit);
// 附件管理
MyServer.setRequest("Upload", Upload);
// 关联表格
MyServer.setRequest("Relate", Relate);


export default MyServer;
