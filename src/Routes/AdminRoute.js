import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

function AdminRoute() {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (loading || isAdminLoading)
    return (
      <div className="flex justify-center items-center">
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  if (user && isAdmin) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}

export default AdminRoute;
