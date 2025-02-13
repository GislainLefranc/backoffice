import { createBrowserRouter } from "react-router-dom";
import Layouts from "../layouts/Layouts";
import Clients from "../pages/Clients";
import Users from "../pages/Users";
import ClientDetail from "../pages/ClientDetail";
import UserDetail from "../pages/UserDetail";
import Project from "../pages/Project";
import Profil from "../pages/Profil";
import Error404 from "../pages/Error404";
import ProtectedRoutes from "./ProtectedRoutes";
import Login from "../pages/Login";
import Error403 from "../pages/Error403";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Layouts />
      </ProtectedRoutes>
    ),
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
        element: (
          <ProtectedRoutes requiredRole="super_admin">
            <Users />
          </ProtectedRoutes>
        ),
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
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/403",
    element: <Error403 />,
  },
]);

export default router;
