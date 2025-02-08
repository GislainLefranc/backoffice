import { createBrowserRouter } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import Clients from "../pages/Clients";
import Users from "../pages/Users";
import ClientDetail from "../pages/ClientDetail";
import UserDetail from "../pages/UserDetail";
import Project from "../pages/Project";
import Profil from "../pages/Profil";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: <Error404 />,
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
