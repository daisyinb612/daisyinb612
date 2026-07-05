import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.js?v=20260705-en-zh-align";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(React.createElement(App));
