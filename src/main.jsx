import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import UserContext from "./context/usercontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContext>
      <App />
    </UserContext>
  </React.StrictMode>
);
