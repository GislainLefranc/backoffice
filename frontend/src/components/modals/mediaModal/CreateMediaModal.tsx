import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createDatasFileOrComment, getDatasById } from "../../../services/api";
import { CreateMediaModalProps } from "./mediaModal.type";

const CreateMediaModal: React.FC<CreateMediaModalProps> = ({
  open,
  onClose,
  project,
  setProject,
}) => {
  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const file = formData.get("file-upload") as File;

    if (!file) {
      console.error("Aucun fichier sélectionné");
      return;
    }

    // Convertir le fichier en base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64File = reader.result?.toString();

      if (!base64File) return;

      const media = {
        name: formData.get("name") as string,
        file: base64File, // 🔥 Envoi du fichier en base64
        projectId: project.id,
      };

      try {
        const createMedia = await createDatasFileOrComment(
          "/projects",
          project.id,
          "media",
          media
        );
        console.log("Réponse du serveur :", createMedia);
        const refreshedProject = await getDatasById("/projects", project.id);
        setProject(refreshedProject);
        onClose();
      } catch (error) {
        console.error("Erreur lors de la création du média :", error);
      }
    };
  };

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 flex items-center justify-center w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-hidden"
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
                  Ajouter un fichier
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Formulaire d'ajout d'un fichier au projet */}
                  <form
                    className="w-full shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-start-2 md:col-end-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="px-4 py-6 sm:p-8">
                      <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-full sm:col-start-1">
                          <label
                            htmlFor="name"
                            className="block font-medium text-blue-950 text-sm/6"
                          >
                            Nom du fichier
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

                        <div className="sm:col-span-full">
                          <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6">
                            <div className="text-center">
                              <div className="mt-4 flex text-sm/6 text-gray-600 justify-center">
                                <label
                                  htmlFor="file-upload"
                                  className="flex relative cursor-pointer rounded-md bg-white font-semibold text-odaptos focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                >
                                  <PaperClipIcon
                                    aria-hidden="true"
                                    className="size-5 shrink-0 text-gray-400"
                                  />
                                  <span>Ajouter un fichier</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                              <p className="mb-4 text-xs/5 text-gray-600">
                                PNG, JPG, GIF, MP4, PDF jusqu'à 10MB
                              </p>
                            </div>
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

export default CreateMediaModal;
