import { useLocation } from "react-router-dom";

export const useAuth = () => {
  const { pathname } = useLocation();

  let role = "student";

  if (pathname.startsWith("/Master")) role = "master";
  else if (pathname.startsWith("/SuperAdmin")) role = "superadmin";
  else if (pathname.startsWith("/Admin")) role = "admin";
  else if (pathname.startsWith("/dashboard/teacher")) role = "teacher";
  else if (pathname.startsWith("/dashboard/parent")) role = "parent";
  else if (pathname.startsWith("/dashboard/student")) role = "student";

  return {
    role,
    isAuthenticated: true,
    user: null,
  };
};
