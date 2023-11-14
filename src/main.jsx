import React from "react";
import ReactDom from "react-dom/client";
import './index.css'
import App from "./App";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<div className="max-w-[100vw] h-[100vh]"><App/></div>);