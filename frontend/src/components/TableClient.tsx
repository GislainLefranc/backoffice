import { Link } from "react-router-dom";
import { useState } from "react";
import CreateClientModal from "./modals/clientModal/CreateClientModal";
import { Client } from "../types/client.type";

interface TableProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

const TableClients = ({ clients, setClients }: TableProps) => {
  const [open, setOpen] = useState(false);

  if (!clients || clients.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 m-6 sm:m-8 lg:m-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Clients</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block rounded-md bg-odaptos px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-odaptos/50 focus-visible:outline-indigo-600"
            >
              + Ajouter un client
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <p className="text-gray-500">Aucune donnée disponible.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 m-6 sm:m-8 lg:m-10 border-2 border-gray-200 rounded-lg">
      <div className="sm:flex sm:items-center m-4">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Clients</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block rounded-md bg-odaptos px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-odaptos/50 focus-visible:outline-indigo-600"
          >
            + Ajouter un client
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Nom
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Téléphone
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Adresse
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Contact
                  </th>
                  <th className="py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {clients.map((item) => (
                  <tr key={item.id as string | number}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.phone}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.address} {item.zip_code} {item.city}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.contact}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <Link
                        to={`/clients/${item.id}`}
                        className="text-odaptos hover:text-blue-400"
                      >
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <CreateClientModal
          open={open}
          onClose={() => setOpen(false)}
          setClients={setClients}
        />
      </div>
    </div>
  );
};

export default TableClients;
