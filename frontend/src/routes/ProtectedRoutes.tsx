import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoutes = ({ children, requiredRole }: ProtectedRoutesProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
