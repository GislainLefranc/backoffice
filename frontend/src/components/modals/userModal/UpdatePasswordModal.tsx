import React, { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { updateDatas } from "../../../services/api";
import { UserModalProps } from "./UserModal.type";

const UpdatePasswordModal = ({ open, onClose, user }: UserModalProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (value: string) => {
    setPasswordCriteria({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      specialChar: /[@$!%*?&]/.test(value),
    });
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      console.error("Les mots de passe ne sont pas identiques");
      alert("Les mots de passe ne sont pas identiques");
      return;
    }

    const formData = new FormData(evt.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (!data.oldPassword) {
      console.error("Vous devez entrer votre ancien mot de passe");
      alert("Vous devez entrer votre ancien mot de passe");
      return;
    }

    delete data.passwordVerif;

    console.log(
      "Soumission du formulaire dans la Modal de création de l'utilisateur",
      data
    );

    try {
      await updateDatas("/auth/update-password", user.id, data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur :", error);
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
            <div className="sm:flex sm:items-start w-full">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Modifier votre mot de passe
                </DialogTitle>
                <div className="mt-2 w-full">
                  {/* Formulaire de création d'un utilisateur */}
                  <form
                    className="w-full shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-start-2 md:col-end-3"
                    onSubmit={handleSubmit}
                  >
                    <div className="w-full px-4 py-6 sm:p-8">
                      <div className="w-full grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        {/* Ancien mot de passe */}

                        <div className="col-span-full">
                          <label className="block text-sm font-medium">
                            Ancien mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              name="oldPassword"
                              className="w-full p-2 border rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                              className="absolute right-2 top-2"
                            >
                              {passwordVisible ? (
                                <EyeSlashIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Mot de passe */}
                        <div className="col-span-full">
                          <label className="block text-sm font-medium">
                            Nouveau mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              name="newPassword"
                              value={password}
                              onChange={(evt) => {
                                validatePassword(evt.target.value);
                                setPassword(evt.target.value);
                              }}
                              className="w-full p-2 border rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setPasswordVisible(!passwordVisible)
                              }
                              className="absolute right-2 top-2"
                            >
                              {passwordVisible ? (
                                <EyeSlashIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Confirmation mot de passe */}
                        <div className="col-span-full">
                          <label className="block text-sm font-medium">
                            Confirmer le nouveau mot de passe
                          </label>
                          <div className="relative">
                            <input
                              type={
                                confirmPasswordVisible ? "text" : "password"
                              }
                              name="passwordVerif"
                              value={confirmPassword}
                              onChange={(evt) =>
                                setConfirmPassword(evt.target.value)
                              }
                              className="w-full p-2 border rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setConfirmPasswordVisible(
                                  !confirmPasswordVisible
                                )
                              }
                              className="absolute right-2 top-2"
                            >
                              {confirmPasswordVisible ? (
                                <EyeSlashIcon className="w-5 h-5" />
                              ) : (
                                <EyeIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Validation des critères du mot de passe */}
                        <ul className="mt-2 text-sm col-span-full">
                          <li
                            className={
                              passwordCriteria.length
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {passwordCriteria.length ? "✔️" : "❌"} Au moins 8
                            caractères
                          </li>
                          <li
                            className={
                              passwordCriteria.uppercase
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {passwordCriteria.uppercase ? "✔️" : "❌"} Une
                            majuscule
                          </li>
                          <li
                            className={
                              passwordCriteria.lowercase
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {passwordCriteria.lowercase ? "✔️" : "❌"} Une
                            minuscule
                          </li>
                          <li
                            className={
                              passwordCriteria.number
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {passwordCriteria.number ? "✔️" : "❌"} Un chiffre
                          </li>
                          <li
                            className={
                              passwordCriteria.specialChar
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {passwordCriteria.specialChar ? "✔️" : "❌"} Un
                            caractère spécial
                          </li>
                        </ul>

                        {password !== confirmPassword && (
                          <p className="text-red-500 col-span-full">
                            Les mots de passe ne sont pas identiques
                          </p>
                        )}
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

export default UpdatePasswordModal;
