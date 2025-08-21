import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "@/store/redux-hooks/useAppSelector";

const ProtectedRoute = () => {
  const token = useAppSelector((state) => state.auth.token);

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
