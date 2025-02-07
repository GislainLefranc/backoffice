import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layouts = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layouts;
