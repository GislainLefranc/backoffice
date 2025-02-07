import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatasById } from "../services/api";
import SeeMediaModal from "../components/modals/mediaModal/SeeMediaModal";
import CreateMediaModal from "../components/modals/mediaModal/CreateMediaModal";
import DeleteMediaModal from "../components/modals/mediaModal/DeleteMediaModal";
import { Project as ProjectProps } from "../types/project.type";
import { Media } from "../types/media.type";

const Project = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media>({
    id: 0,
    name: "",
    url: "",
    createdAt: "",
    projectId: 0,
  });
  const [project, setProject] = useState<ProjectProps>({
    id: 0,
    name: "",
    description: "",
    clientId: 0,
    media: [],
    comments: [],
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        try {
          const data = await getDatasById("/projects", projectId);
          console.log(data);
          setProject(data);
        } catch (error) {
          console.error("Erreur lors de la récupération du projet", error);
        }
      }
    };
    fetchProject();
  }, [projectId]);

  return (
    <div className="p-6">
      <div className="px-4 sm:px-0">
        <h1 className="text-base/7 font-semibold text-gray-900">
          {project.name}
        </h1>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          {project.description}
        </p>
      </div>
      <div className="m-6 border border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-lg shadow-sm">
        <div className="-ml-4 -mt-2 mb-5 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold text-gray-900">
              Fichiers du projet
            </h3>
          </div>
          <div className="ml-4 mt-2 shrink-0">
            <button
              type="button"
              onClick={() => setOpenCreate(true)}
              className="relative inline-flex items-center rounded-md bg-odaptos px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ajouter un fichier
            </button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-300">
          <tbody className="divide-y divide-gray-200 bg-white">
            {project.media.map((media) => (
              <tr key={media.name}>
                <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                  {media.name}
                </td>
                <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                  <button
                    className="mx-4 mt-1 max-w-2xl text-sm/6 text-gray-500 hover:text-odaptos"
                    onClick={() => {
                      setSelectedMedia(media);
                      setOpen(true);
                    }}
                  >
                    Voir
                  </button>
                  <button
                    className="mx-4 mt-1 max-w-2xl text-sm/6 text-gray-500 hover:text-odaptos"
                    onClick={() => {
                      setSelectedMedia(media);
                      setOpenDelete(true);
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SeeMediaModal
        open={open}
        onClose={() => setOpen(false)}
        media={selectedMedia}
      />
      <CreateMediaModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        project={project}
        setProject={setProject}
      />
      <DeleteMediaModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        media={selectedMedia}
        setProject={setProject}
      />
    </div>
  );
};

export default Project;
