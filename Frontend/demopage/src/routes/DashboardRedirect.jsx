import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function DashboardRedirect() {
  const { role } = useAuth();

  if (!role) return null;

  return <Navigate to={`/dashboard/${role}`} replace />;
}