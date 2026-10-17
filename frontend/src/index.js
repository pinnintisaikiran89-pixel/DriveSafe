import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "leaflet/dist/leaflet.css";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Authentication Context
import { AuthProvider } from "./contexts/AuthContext";

// Root
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

// Render App
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// Performance
reportWebVitals();