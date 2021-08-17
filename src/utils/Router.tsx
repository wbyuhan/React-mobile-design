import React, { createElement } from "react";
import { useRoutes } from "react-router-dom";
import { routerConfig } from "../../config/routes";

const App: React.FC = () => {
  const routerComponents = (routerConfig || []).map((item: any) => {
    return {
      element: createElement(item.component),
      path: item.path
    };
  });
  const element = useRoutes(routerComponents);
  return element;
};

export default App;
