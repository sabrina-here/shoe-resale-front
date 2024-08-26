import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  if (user) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}

export default PrivateRoute;
