import { Link } from "react-router-dom";
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import CreateUserModal from "./modals/userModal/CreateUserModal";
import { User } from "../types/user.type";

interface TableProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const TableUsers = ({ users, setUsers }: TableProps) => {
  const [open, setOpen] = useState(false);

  if (!users || users.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 m-6 sm:m-8 lg:m-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">
              Utilisateurs
            </h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="block rounded-md bg-odaptos px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-odaptos/50 focus-visible:outline-indigo-600"
            >
              + Ajouter un utilisateur
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
          <h1 className="text-base font-semibold text-gray-900">
            Utilisateurs
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block rounded-md bg-odaptos px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-odaptos/50 focus-visible:outline-indigo-600"
          >
            + Ajouter un utilisateur
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
                    id
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Nom
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rôle
                  </th>
                  <th className="py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((item) => (
                  <tr key={item.id as string | number}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.image === null ? (
                        <UserCircleIcon
                          aria-hidden="true"
                          className="inline-block w-8 h-8 text-gray-300"
                        />
                      ) : (
                        <img
                          alt={`Image de profil ${item.firstname} ${item.lastname}`}
                          src={item.image}
                          className="inline-block h-8 w-8 rounded-full object-cover"
                        />
                      )}
                      <span className="mx-2">
                        {item.firstname} {item.lastname}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.role === "super_admin"
                        ? "Administrateur"
                        : "Utilisateur"}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8">
                      <Link
                        to={`/utilisateurs/${item.id}`}
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
        <CreateUserModal
          open={open}
          onClose={() => setOpen(false)}
          setUsers={setUsers}
        />
      </div>
    </div>
  );
};

export default TableUsers;
