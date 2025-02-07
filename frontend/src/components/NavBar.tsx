import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/odaptos.webp";
import { useProfil } from "../context/profil/useProfil";

const NavBar = () => {
  const { profil: user } = useProfil();

  console.log(user);

  const userNavigation = [
    { name: "Profil", href: "/profil" },
    { name: "Déconnexion", href: "#" },
  ];

  return (
    <Disclosure as="nav" className="bg-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center flex-shrink-0">
              <img src={logo} alt="logo" className="w-20" />
            </NavLink>
            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-sm font-medium ${
                      isActive
                        ? "bg-odaptos text-white"
                        : "text-blue-950 hover:bg-odaptos/25"
                    }`
                  }
                >
                  Clients
                </NavLink>
                {user?.role === "super_admin" && (
                  <NavLink
                    to="/utilisateurs"
                    className={({ isActive }) =>
                      `rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? "bg-odaptos text-white"
                          : "text-blue-950 hover:bg-odaptos/25"
                      }`
                    }
                  >
                    Équipes
                  </NavLink>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profil */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex max-w-xs items-center rounded-full text-sm">
                    {user?.image ? (
                      <img
                        alt="image de profil de l'utilisateur"
                        src={user.image}
                        className="size-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="inline-block size-8 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          className="size-full text-gray-300"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <Link
                      to="/profil"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                    >
                      Profil
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-full p-2 bg-odaptos text-blue-50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="md:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block rounded-md px-3 py-2 text-base font-medium ${
                isActive
                  ? "bg-odaptos text-white"
                  : "text-blue-950 hover:text-odaptos"
              }`
            }
          >
            Clients
          </NavLink>

          {user?.role === "super_admin" && (
            <NavLink
              to="/utilisateurs"
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive
                    ? "bg-odaptos text-white"
                    : "text-blue-950 hover:text-odaptos"
                }`
              }
            >
              Équipes
            </NavLink>
          )}
        </div>
        <div className="border-t border-odaptos pb-3 pt-4">
          <div className="flex items-center px-5">
            <div className="shrink-0">
              {user?.image ? (
                <img
                  alt="image de profil de l'utilisateur"
                  src={user.image}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <span className="inline-block size-10 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="size-full text-gray-300"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-blue-950">
                {user?.firstname} {user?.lastname}
              </div>
              <div className="text-sm font-medium text-blue-950">
                {user?.email}
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1 px-2">
            {userNavigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-blue-950 hover:text-odaptos"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default NavBar;
