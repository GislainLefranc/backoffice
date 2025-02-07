import { Project } from "../../../types/project.type";
import { Client } from "../../../types/client.type";

export interface ProjectsModalProps {
  open: boolean;
  onClose: () => void;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  data: Client;
  setData: React.Dispatch<React.SetStateAction<Project[]>>;
}

export interface DeleteProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project[]>>;
}
