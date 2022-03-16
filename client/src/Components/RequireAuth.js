import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "./context.js";

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="#/createAccount" state={{ from: location }} />;
  }

  return <Outlet />;
}

export { RequireAuth };
