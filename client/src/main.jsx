import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch(function (error) {
      console.error("Error registering Service Worker:", error);
    });
}
const root = document.getElementById("root");
createRoot(root).render(<App />);
