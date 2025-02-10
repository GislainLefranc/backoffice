import { useEffect, useState } from "react";
import { getDatas } from "../services/api";
import TableClients from "../components/TableClient";
import { Client } from "../types/client.type";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

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

  // Calcul du nombre de pages
  const clientsPerPage = 10;
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  // Fonction pour récupérer les clients de la page actuelle
  const currentClients = clients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  // Fonction pour changer de page
  const handleChangePage = (page: number) => {
    if (page >= 1 || page > totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <TableClients clients={currentClients} setClients={setClients} />
      {/* Boutons de pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div>
          <p className="text-sm text-gray-700">
            De <span className="font-medium">{currentPage}</span> à{" "}
            <span className="font-medium">{clientsPerPage}</span> sur{" "}
            <span className="font-medium">{clients.length}</span> clients
          </p>
        </div>
        <div>
          <button
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:text-odaptos"
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Précédent
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handleChangePage(index + 1)}
              className={`relative hidden items-center px-4 py-2 font-semibold ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 md:inline-flex ${
                currentPage === index + 1
                  ? "bg-odaptos text-white"
                  : "text-blue-950 hover:text-odaptos hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0 hover:text-odaptos"
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
    </>
  );
};

export default Clients;
