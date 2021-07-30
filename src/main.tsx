import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import store from "./store";
import App from "./App";
import "virtual:windi.css";
import './index.css'
import 'zarm/dist/zarm.css'

render(
  <StrictMode>
    <Provider store={ store }>
      <ConfigProvider locale={ zhCN }>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
