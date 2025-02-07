import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProfilProvider } from "./context/profil/ProfilProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProfilProvider>
      <App />
    </ProfilProvider>
  </StrictMode>
);
