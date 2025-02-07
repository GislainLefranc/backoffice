import { createContext } from "react";
import { User } from "../../types/user.type";

interface ProfilContextType {
  profil: User | null;
  setProfil: React.Dispatch<React.SetStateAction<User | null>>;
}

export const ProfilContext = createContext<ProfilContextType | undefined>(
  undefined
);
