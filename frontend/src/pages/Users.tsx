import { useEffect, useState } from "react";
import TableUsers from "../components/TableUsers";
import { getDatas } from "../services/api";
import { User } from "../types/user.type";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getDatas("/users");
        console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };
    fetchUsers();
  }, []);

  return <TableUsers users={users} setUsers={setUsers} />;
};

export default Users;
