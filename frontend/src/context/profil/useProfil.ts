import { useContext } from "react";
import { ProfilContext } from "./ProfilContext";

export const useProfil = () => {
  const context = useContext(ProfilContext);
  if (context === undefined) {
    throw new Error("useProfil doit être utilisé dans un ProfilProvider");
  }
  return context;
};
