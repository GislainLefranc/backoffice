import { createBrowserRouter } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import Clients from "../pages/Clients";
import Users from "../pages/Users";
import ClientDetail from "../pages/ClientDetail";
import UserDetail from "../pages/UserDetail";
import Project from "../pages/Project";
import Profil from "../pages/Profil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/",
        element: <Clients />,
      },
      {
        path: "/clients/:clientId",
        element: <ClientDetail />,
      },
      {
        path: "/utilisateurs",
        element: <Users />,
      },
      {
        path: "/utilisateurs/:userId",
        element: <UserDetail />,
      },
      {
        path: "/projets/:projectId",
        element: <Project />,
      },
      {
        path: "/profil",
        element: <Profil />,
      },
    ],
  },
]);

export default router;
