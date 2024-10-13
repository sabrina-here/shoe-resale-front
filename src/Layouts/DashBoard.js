import React, { useContext, useState } from "react";
import Header from "../Components/Header";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { AuthContext } from "../Contexts/AuthProvider";
import useSeller from "../Hooks/useSeller";
import Loader from "../Components/Loader";
import useAdmin from "../Hooks/useAdmin";

function DashBoard() {
  const { user } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  if (isSellerLoading || isAdminLoading) return <Loader></Loader>;

  return (
    <div>
      <Header></Header>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}

          <Outlet></Outlet>

          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content h-auto w-80 p-4">
            {/* Sidebar content here */}
            {isAdmin ? (
              <>
                <li>
                  <Link to={"/dashboard/admin/allSellers"}>All Sellers</Link>
                </li>
                <li>
                  <Link to={"/dashboard/admin/allBuyers"}>All Buyers</Link>
                </li>
              </>
            ) : isSeller ? (
              <>
                <li>
                  <Link to={"/dashboard/seller"}>My Products</Link>
                </li>
                <li>
                  <Link to={"/dashboard/seller/addProduct"}>Add Product</Link>
                </li>
                <li>
                  <Link to={"/dashboard/seller/sellerBookings"}>
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard/seller/sellerHistory"}>My History</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/dashboard/myOrders"}>My Orders</Link>
                </li>
                <li>
                  <Link to={"/dashboard/customerHistory"}>My History</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default DashBoard;
