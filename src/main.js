import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js?v=20260525-viewstats";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(React.createElement(App));
