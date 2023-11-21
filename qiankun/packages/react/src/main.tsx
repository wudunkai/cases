import React from "react";
import { createRoot } from "react-dom/client";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/es/helper";
import App from "./App";

let root: any = null;

// 渲染函数
const render = (props: { [x: string]: any; container?: any }) => {
  const { container } = props;
  root = createRoot(
    container
      ? container.querySelector("#root")
      : (document.getElementById("root") as HTMLElement)
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// 导出 qiankun 的生命周期钩子函数
renderWithQiankun({
  mount(props: { [x: string]: any; container?: any }) {
    console.log("[react18] props from main framework", props);
    // 挂在后渲染
    render(props);
  },
  bootstrap() {
    console.log("[react18] react app bootstraped");
  },
  unmount(props: { container: any }) {
    const { container } = props;
    // 卸载后清理
    root.unmount(
      container
        ? container.querySelector("#root")
        : (document.getElementById("root") as HTMLElement)
    );
  },
  update(props: any) {
    console.log("[react18] react app update", props);
  },
});

// 判断是否在 qiankun 环境下而后渲染
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
