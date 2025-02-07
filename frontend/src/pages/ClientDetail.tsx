import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDatasById } from "../services/api";
import UpdateClientModal from "../components/modals/clientModal/UpdateClientModal";
import DeleteClientModal from "../components/modals/clientModal/DeleteClientModal";
import CreateProjectModal from "../components/modals/projectModal/CreateProjectModal";
import { Client } from "../types/client.type";
import { Project } from "../types/project.type";
import DeleteProjectModal from "../components/modals/projectModal/DeleteProjectModal";

const ClientDetail = () => {
  const { clientId } = useParams();
  const [client, setClient] = useState<Client>({
    id: 0,
    legal_status: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    zip_code: "",
    city: "",
    contact: "",
    projects: [],
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project>({
    id: 0,
    name: "",
    description: "",
    clientId: 0,
    media: [],
    comments: [],
  });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openDeleteProject, setOpenDeleteProject] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      if (clientId) {
        try {
          const data = await getDatasById("/clients", clientId);
          console.log(data);
          setClient(data);
          setProjects(data.projects);
        } catch (error) {
          console.error("Erreur lors de la récupération du client", error);
        }
      }
    };
    fetchClient();
  }, [clientId]);

  if (!client) return <p>Aucun client trouvé.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          {client.legal_status} {client.name}
        </h1>
        <div>
          <button
            className="mx-4 mt-1 max-w-2xl text-sm/6 text-gray-500 hover:text-odaptos"
            onClick={() => setOpen(true)}
          >
            Modifier
          </button>
          <button
            className="mx-4 mt-1 max-w-2xl text-sm/6 text-gray-500 hover:text-odaptos"
            onClick={() => setOpenDelete(true)}
          >
            Supprimer
          </button>
        </div>
      </div>
      <div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Email</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Téléphone</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client.phone}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Adresse postale
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client.address}, {client.zip_code} {client.city}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Contact</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {client.contact}
              </dd>
            </div>
            {/* Section des projets */}
            <div className="mt-10">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">Projets</h2>
                <button
                  className="bg-odaptos text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setOpenProject(true)}
                >
                  + Ajouter un projet
                </button>
              </div>

              {projects && projects.length > 0 ? (
                <ul className="mt-4 divide-y divide-gray-200 border border-gray-300 rounded-lg">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="p-4 hover:bg-gray-100 flex justify-between"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center mx-6">
                        <div className="mx-4">
                          <Link
                            to={`/projets/${project.id}`}
                            className="text-odaptos font-medium hover:underline"
                          >
                            Voir
                          </Link>
                        </div>
                        <button
                          onClick={() => {
                            setProject(project);
                            setOpenDeleteProject(true);
                          }}
                          className="text-odaptos font-medium hover:underline"
                        >
                          Supprimer
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-gray-500">Aucun projet trouvé.</p>
              )}
            </div>
          </dl>
        </div>
      </div>
      <UpdateClientModal
        open={open}
        client={client}
        setClient={setClient}
        onClose={() => setOpen(false)}
      />
      <DeleteClientModal
        open={openDelete}
        client={client}
        setClient={setClient}
        onClose={() => setOpenDelete(false)}
      />
      <CreateProjectModal
        open={openProject}
        onClose={() => setOpenProject(false)}
        data={client}
        setData={setProjects}
      />
      <DeleteProjectModal
        open={openDeleteProject}
        onClose={() => setOpenDeleteProject(false)}
        project={project}
        setProject={setProjects}
      />
    </div>
  );
};

export default ClientDetail;
