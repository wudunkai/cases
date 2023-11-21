import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import router from "./router";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/es/helper";

let app: { mount: (arg0: any) => void; unmount: () => void };

const render = (
  container?: { querySelector: (arg0: string) => any } | undefined
) => {
  app = createApp(App);
  app.mount(container ? container.querySelector("#app") : "#app");
};

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      const { container } = props;
      render(container);
    },
    bootstrap() {},
    unmount() {
      app.unmount();
    },
    update: function (): void | Promise<void> {
      throw new Error("Function not implemented.");
    },
  });
};

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();
