import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="shell">
      <div className="tagrow"><span className="tag">Practical 10: Complete CRUD: Employee Management</span></div>
      <App />
      <footer className="footer">
        <strong>Rishit H Modi</strong>
        <span>Enrollment No.: 24032211192</span>
        <span>BCA Honours, Ganpat University (AMPICS)</span>
      </footer>
    </div>
  </React.StrictMode>
);
