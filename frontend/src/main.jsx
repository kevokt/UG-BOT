import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "@/components/ui/provider";
import "./style.css";
import "animate.css/animate.compat.css"


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
