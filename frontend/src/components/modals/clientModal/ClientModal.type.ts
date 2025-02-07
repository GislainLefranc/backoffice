import { Client } from "../../../types/client.type";

export interface ClientsModalProps {
  open: boolean;
  onClose: () => void;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

export interface ClientModalProps {
  open: boolean;
  onClose: () => void;
  client: Client;
  setClient: React.Dispatch<React.SetStateAction<Client>>;
}
