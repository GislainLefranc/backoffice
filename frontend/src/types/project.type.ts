import { Media } from "./media.type";
import { Comment } from "./comment.type";

export interface Project {
  id: number | string;
  name: string;
  description: string;
  clientId: number | string;
  media: Media[];
  comments: Comment[];
}
