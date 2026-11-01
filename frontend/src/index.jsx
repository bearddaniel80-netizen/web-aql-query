import React from "react";
import ReactDOM from "react-dom/client";
import HtmlFragment from "./components/views/HtmlFragmentsView";
import Navigation from "./components/menu/nav/Navigation";
import { navigationConfig } from "./navigation";

ReactDOM.createRoot(
  document.getElementById("nav")
).render(
  <React.StrictMode>
    <Navigation model={navigationConfig}/>
  </React.StrictMode>
);

async function myList(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <HtmlFragment data={await myList("/api/index")}/>
  </React.StrictMode>
);