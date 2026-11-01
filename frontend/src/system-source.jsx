import React from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/menu/nav/Navigation";
import { navigationConfig } from "./navigation";
import QueryDashboard from "./components/container/QueryPage";


ReactDOM.createRoot(
  document.getElementById("nav")
).render(
  <React.StrictMode>
    <Navigation model={navigationConfig}/>
  </React.StrictMode>
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <QueryDashboard mode="default"/>
  </React.StrictMode>
);