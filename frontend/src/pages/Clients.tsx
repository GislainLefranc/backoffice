import { useEffect, useState } from "react";
import { getDatas } from "../services/api";
import TableClients from "../components/TableClient";
import { Client } from "../types/client.type";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getDatas("/clients");
        console.log(data);
        setClients(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des clients", error);
      }
    };
    fetchClients();
  }, []);

  return (
    <>
      <TableClients clients={clients} setClients={setClients} />
    </>
  );
};

export default Clients;
