import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Enable mocking in both development and production environments
async function enableMocking() {
  const { worker } = await import("./mocks/browser");

  // Start the Service Worker to intercept requests in both development and production
  return worker.start({
    onUnhandledRequest: "bypass", // Allow real API requests when no mock is defined
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
