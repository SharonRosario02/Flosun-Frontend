import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouteNames } from '../../types/RouteNames';

interface AuthWrapperProps {
  children: React.ReactNode;
  isAdminRoute?: boolean;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, isAdminRoute = false }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      const isAdmin = user ? JSON.parse(user).email === "admin@gmail.com" : false;

      if (!user) {
        const loginPath = `/${RouteNames.LOGIN}`;
        navigate(loginPath, { replace: true });
      } else if (isAdminRoute && !isAdmin) {
        const homePath = `/${RouteNames.HOME}`;
        navigate(homePath, { replace: true });
      }
    };

    checkAuth();
  }, [navigate, isAdminRoute]); 
  return <>{children}</>;
};

export default AuthWrapper;