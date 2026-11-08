
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import HtmlFragment from "./components/views/HtmlFragmentsView";
import Navigation from "./components/menu/nav/Navigation";
import { navigationConfig } from "./navigation";


async function myList(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function GettingStarted() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    myList("/api/getting-started")
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <HtmlFragment data={data} />;
}

// Navigation
ReactDOM.createRoot(
  document.getElementById("nav")
).render(
  <React.StrictMode>
    <Navigation model={navigationConfig} />
  </React.StrictMode>
);

// Main content
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <GettingStarted />
  </React.StrictMode>
);
