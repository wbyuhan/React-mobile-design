import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import { ConfigProvider } from "zarm";
import App from "@/utils/Router";
// import zhCN from "zarm/lib/config-provider/locale/zh_CN";

if (module && module.hot) {
  module.hot.accept();
}
import "zarm/dist/zarm.css";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
