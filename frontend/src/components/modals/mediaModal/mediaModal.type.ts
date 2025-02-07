import { Project } from "../../../types/project.type";
import { Media } from "../../../types/media.type";

export interface MediasModalProps {
  open: boolean;
  onClose: () => void;
  setMedias: React.Dispatch<React.SetStateAction<Media[]>>;
}

export interface CreateMediaModalProps {
  open: boolean;
  onClose: () => void;
  project: Project;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export interface MediaModalProps {
  open: boolean;
  onClose: () => void;
  media: Media;
  setMedia: React.Dispatch<React.SetStateAction<Media | null>>;
}

export interface MediaModalWithProjectProps {
  open: boolean;
  onClose: () => void;
  media: Media;
  setProject: React.Dispatch<React.SetStateAction<Project>>;
}

export interface ViewMediaModalProps {
  open: boolean;
  onClose: () => void;
  media: Media;
}
