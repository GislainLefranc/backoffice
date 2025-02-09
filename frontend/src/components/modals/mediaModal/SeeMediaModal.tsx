import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ViewMediaModalProps } from "./mediaModal.type";

const SeeMediaModal = ({ open, onClose, media }: ViewMediaModalProps) => {
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
                  Deactivate account
                </DialogTitle>
                {media ? (
                  <div className="mt-2">
                    {media.url.match(/\.(jpeg|jpg|gif|png)$/) ? (
                      <img
                        src={media.url}
                        alt={media.name}
                        className="w-full h-auto rounded-md"
                      />
                    ) : media.url.match(/\.(mp4|webm|ogg)$/) ? (
                      <video controls className="w-full h-auto rounded-md">
                        <source src={media.url} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    ) : media.url.match(/\.(pdf)$/) ? (
                      <embed
                        src={media.url}
                        type="application/pdf"
                        className="w-full h-[500px]"
                      />
                    ) : (
                      <p className="text-gray-500">
                        Fichier non pris en charge
                      </p>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default SeeMediaModal;
