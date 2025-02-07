import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createDatas } from "../../../services/api";
import { CreateProjectModalProps } from "./projectModal.type";
import { Project } from "../../../types/project.type";

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  onClose,
  data: client,
  setData: setProject,
}) => {
  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    try {
      const formData = new FormData(evt.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      if (!client?.id) {
        throw new Error("L'ID du client est introuvable");
      }

      const dataAndClientId = { ...data, clientId: client.id };

      console.log(
        "Soumission du formulaire dans la Modal de création du projet",
        formData
      );
      const createdProject = (await createDatas(
        "/projects",
        dataAndClientId
      )) as Project;
      setProject((prevProjects) => [...prevProjects, createdProject]);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
    }
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
              <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Ajoutez un projet
                </DialogTitle>
                <div className="mt-2">
                  {/* Formulaire de création d'un projet */}
                  <form
                    className="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
                    onSubmit={handleSubmit}
                  >
                    <div className="px-4 py-6 sm:p-8">
                      <div className="mb-2">
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
                            autoComplete="name"
                            className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label
                          htmlFor="description"
                          className="block font-medium text-blue-950 text-sm/6"
                        >
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            autoComplete="description"
                            className="px-3 block w-full rounded-md border-0 py-1.5 text-blue-950 shadow-sm bg-green-high ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-primary sm:text-sm/6"
                          />
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

export default CreateProjectModal;
