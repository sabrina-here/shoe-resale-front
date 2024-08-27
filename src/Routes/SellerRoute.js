import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import useSeller from "../Hooks/useSeller";
import { Navigate, useLocation } from "react-router-dom";

function SellerRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();
  if (loading || isSellerLoading)
    return (
      <div className="flex justify-center items-center">
        <div>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  if (user && isSeller) return children;
  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
}

export default SellerRoute;
