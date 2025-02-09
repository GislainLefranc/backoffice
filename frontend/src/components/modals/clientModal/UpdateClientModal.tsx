import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getDatasById, updateDatas } from "../../../services/api";
import { ClientModalProps } from "./ClientModal.type";

const UpdateClientModal = ({
  open,
  onClose,
  client,
  setClient,
}: ClientModalProps) => {
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log("Données envoyées après suppression de projects :", client);

    if (client.id) {
      try {
        const updatedClient = await updateDatas("/clients", client.id, client);
        console.log("Réponse du serveur :", updatedClient);
        const refreshedClient = await getDatasById("/clients", client.id);
        setClient(refreshedClient);
        onClose();
      } catch (error) {
        console.error("Erreur lors de la mise à jour du client :", error);
      }
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Modifier les informations client
                </DialogTitle>
                <div className="mt-2">
                  {/* Formulaire de modification des informations clients */}
                  <form
                    className="bg-green-high shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-start-2 md:col-end-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="px-4 py-6 sm:p-8">
                      <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="statut légale"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Statut légale
                          </label>
                          <div className="mt-1">
                            <input
                              id="lastname"
                              name="lastname"
                              type="text"
                              value={client.legal_status}
                              onChange={handleInputChange}
                              placeholder={
                                client.legal_status ? client.legal_status : ""
                              }
                              autoComplete="given-name"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="name"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Nom
                          </label>
                          <div className="mt-1">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={client.name}
                              onChange={handleInputChange}
                              placeholder={client.name ? client.name : ""}
                              autoComplete="family-name"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-3">
                          <label
                            htmlFor="email"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Email
                          </label>
                          <div className="mt-1">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={client.email ? client.email : ""}
                              onChange={handleInputChange}
                              autoComplete="family-name"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="col-span-3">
                          <label
                            htmlFor="phone"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Téléphone
                          </label>
                          <div className="mt-1">
                            <input
                              id="phone"
                              name="phone"
                              type="text"
                              placeholder={client.phone ? client.phone : ""}
                              value={client.phone ? client.phone : ""}
                              onChange={handleInputChange}
                              autoComplete="phone"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-full sm:col-start-1">
                          <label
                            htmlFor="address"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Adresse
                          </label>
                          <div className="mt-1">
                            <input
                              id="address"
                              name="address"
                              type="text"
                              placeholder={client.address ? client.address : ""}
                              value={client.address ? client.address : ""}
                              onChange={handleInputChange}
                              autoComplete="address-level2"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="zip_code"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Code Postal
                          </label>
                          <div className="mt-1">
                            <input
                              id="zip_code"
                              name="zip_code"
                              type="text"
                              placeholder={
                                client.zip_code ? client.zip_code : ""
                              }
                              value={client.zip_code ? client.zip_code : ""}
                              onChange={handleInputChange}
                              autoComplete="zip-code"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="city"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Ville
                          </label>
                          <div className="mt-1">
                            <input
                              id="city"
                              name="city"
                              type="city"
                              placeholder={client.city ? client.city : ""}
                              value={client.city ? client.city : ""}
                              onChange={handleInputChange}
                              autoComplete="city"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-full">
                          <label
                            htmlFor="contact"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Contact
                          </label>
                          <div className="mt-1">
                            <input
                              id="contact"
                              name="contact"
                              type="text"
                              placeholder={client.contact ? client.contact : ""}
                              value={client.contact ? client.contact : ""}
                              onChange={handleInputChange}
                              autoComplete="contact"
                              className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-end px-4 py-4 gap-x-6 sm:px-8">
                      <div className="mt-1 sm:mt-1 sm:flex sm:flex-row">
                        <button
                          type="button"
                          onClick={onClose}
                          className="mx-2 fmt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="inline-flex w-full justify-center rounded-md bg-odaptos px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 sm:ml-3 sm:w-auto"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateClientModal;
