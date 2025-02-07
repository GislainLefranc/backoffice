import { Project } from "./project.type";

export interface Client {
  id: number | string;
  legal_status: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  zip_code: string;
  city: string;
  contact: string;
  projects: Project[];
}
