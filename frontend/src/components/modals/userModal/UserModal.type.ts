export interface UsersModalProps {
  open: boolean;
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  image: string;
}
