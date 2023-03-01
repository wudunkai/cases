/**防止重复点击重复弹出message弹框 */
import { ElMessage } from "element-plus";
// let messageInstance = null;
const resetMessage = (options) => {
  // eslint-disable-next-line new-cap
  ElMessage(options);
};
/**设置message弹框的格式 */

["error", "success", "info", "warning"].forEach((item) => {
  // eslint-disable-next-line new-cap
  resetMessage[item] = (msg) =>
    ElMessage({
      showClose: true,
      duration: 2000,
      type: item,
      message: msg,
      offset: window.innerHeight / 2,
    });
});

export default resetMessage;
