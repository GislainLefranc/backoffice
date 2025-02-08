import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

const Error404 = () => {
  return (
    <>
      <NavBar />
      <div className="grid justify-center min-h-full bg-white">
        <main className="mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
          <div className="max-w-lg text-center">
            <p className="text-base/8 font-semibold text-odaptos">Erreur 404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-6xl">
              Page non trouvée
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Désolé, nous n’avons pas pu trouver la page que vous recherchez.
            </p>
            <div className="mt-10">
              <Link to="/" className="text-sm/7 font-semibold text-odaptos">
                <span aria-hidden="true">&larr;</span> Retourner à l’accueil
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Error404;
