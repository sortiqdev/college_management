import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase(); 
  let role = "student";

  if (path.startsWith("/master")) role = "master";
  else if (path.startsWith("/dashboard/superadmin")) role = "superadmin";
  else if (path.startsWith("/dashboard/admin")) role = "admin";
  else if (path.startsWith("/dashboard/teacher")) role = "teacher";
  else if (path.startsWith("/dashboard/parent")) role = "parent";
  else if (path.startsWith("/dashboard/student")) role = "student";

  return {
    role,
    isAuthenticated: true,
    user: null,
  };
};
