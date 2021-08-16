import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter as Router } from "react-router-dom";
import { ConfigProvider } from "zarm";
import { routerConfig } from "./config/routes";
import renderRoute from "./utils/route";
import zhCN from "zarm/lib/config-provider/locale/zh_CN";
import "zarm/dist/zarm.css";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <BrowserRouter>
        <Router>
          <ConfigProvider locale={zhCN}>
            {renderRoute(routerConfig)}
          </ConfigProvider>
        </Router>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
