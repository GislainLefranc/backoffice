import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { updateDatas } from "../services/api";
import DeleteUserModal from "../components/modals/userModal/DeleteUserModal";
import { useAuth } from "../context/auth/useAuth";
import { User } from "../types/user.type";
import UpdatePasswordModal from "../components/modals/userModal/UpdatePasswordModal";

const Profil = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [userProfil, setUserProfil] = useState<User>({
    id: user?.id || 0,
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    role: user?.role || "admin",
    image: user?.image || "",
  });

  useEffect(() => {
    if (user) {
      setUserProfil(user); // Mise à jour de l'état de l'utilisateur dès que le profil change
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfil((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserProfil({ ...userProfil, role: e.target.value });
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    const image = file[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUserProfil({ ...userProfil, image: reader.result as string }); // Mise à jour de l'image (en base64) de profil
    });
    reader.readAsDataURL(image);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user && user.id) {
      try {
        updateDatas("/users", user.id, user);
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
      }
    }
  };

  return (
    <>
      <form
        className="max-w-5xl mx-4 sm:mx-auto flex flex-col items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center m-4 space-y-12 w-full">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 pb-12 w-full max-w-2xl">
            <div className="flex items-center justify-between max-w-2xl">
              <h1 className="text-lg font-semibold text-gray-900">
                Profil de {userProfil.firstname} {userProfil.lastname}
              </h1>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {userProfil.image === null ? (
                    <UserCircleIcon
                      aria-hidden="true"
                      className="size-12 text-gray-300"
                    />
                  ) : (
                    <img
                      src={userProfil.image}
                      alt="photo de profil"
                      className="inline-block h-12 w-12 rounded-full object-cover"
                    />
                  )}
                  <label
                    htmlFor="file-upload"
                    className="rounded-md bg-green-high px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Modifier
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      onInput={updateImage}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="firstname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Prénom
                </label>
                <div className="mt-2">
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    value={userProfil.firstname}
                    placeholder={userProfil ? userProfil.firstname : ""}
                    onChange={handleInputChange}
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-odaptos sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastname"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Nom
                </label>
                <div className="mt-2">
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    value={userProfil?.lastname}
                    placeholder={userProfil ? userProfil.lastname : ""}
                    onChange={handleInputChange}
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-odaptos sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userProfil.email}
                    placeholder={userProfil ? userProfil.email : ""}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-odaptos sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="role"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Role
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="role"
                    name="role"
                    value={userProfil.role}
                    onChange={handleOptionChange}
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-odaptos sm:text-sm/6"
                  >
                    <option value="super_admin">Administrateur</option>
                    <option value="admin">Utilisateur</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 max-w-5xl w-full border-t border-gray-900/10 py-4">
              <div className="flex flex-col gap-x-1">
                <button
                  className="mx-4 max-w-2xl text-sm/6 text-gray-500 hover:text-odaptos"
                  onClick={() => setOpenPassword(true)}
                >
                  Modifier le mot de passe
                </button>
                <button
                  className="mx-4 max-w-2xl text-sm/6 text-gray-500 hover:text-odaptos"
                  onClick={() => setOpenDelete(true)}
                >
                  Supprimer le profil
                </button>
              </div>
              <div className="mx-4 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="mx-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-100 sm:mt-0 sm:w-auto"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-odaptos px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-odaptos"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <DeleteUserModal
        open={openDelete}
        user={userProfil}
        setUser={setUserProfil}
        onClose={() => setOpenDelete(false)}
      />
      <UpdatePasswordModal
        open={openPassword}
        user={userProfil}
        setUser={setUserProfil}
        onClose={() => setOpenPassword(false)}
      />
    </>
  );
};

export default Profil;
