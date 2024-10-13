import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import Loader from "./Loader";
import useSeller from "../Hooks/useSeller";
import useAdmin from "../Hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import Logo from "./Logo";

function Header() {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);

  const [categories, setCategories] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        `https://shoe-resale-server.vercel.app/categories`
      );
      const data = await response.json();
      setCategories(data[0].categories);
      return data;
    },
  });

  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/categoryProducts/${selectedCategory}`);
    }
  };

  const handleLogout = () => {
    logOut()
      .then()
      .catch((e) => console.error(e));
    navigate("/");
  };

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/"}>About</Link>
      </li>

      <li>
        <Link to={"/blogs"}>Blogs</Link>
      </li>

      {user?.uid ? (
        <>
          {isAdmin ? (
            <>
              <li>
                <Link to={"/dashboard/admin/allSellers"}>Admin DashBoard</Link>
              </li>
            </>
          ) : (
            <>
              {isSeller ? (
                <li>
                  <Link to={"/dashboard/seller"}>Seller DashBoard</Link>
                </li>
              ) : (
                <li>
                  <Link to={"/dashboard/myOrders"}>DashBoard</Link>
                </li>
              )}
            </>
          )}
          <li className="btn btn-outline" onClick={handleLogout}>
            Sign Out
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Sign Up</Link>
          </li>
        </>
      )}
    </React.Fragment>
  );

  if (loading || isLoading) return <Loader></Loader>;
  // if (isSellerLoading || isAdminLoading) return <Loader></Loader>;

  return (
    <div>
      <div className="navbar bg-base-100 flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {menuItems}
            </ul>
          </div>
          <Link to={"/"}>
            <div tabIndex={2} role="button" className="w-48">
              <Logo></Logo>
            </div>
          </Link>

          <div>
            <select
              className="select select-bordered w-full max-w-xs"
              defaultValue="default"
              onChange={handleCategoryChange}
            >
              <option value="default" disabled>
                Shoe Categories
              </option>

              {categories?.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ----- LARGE DEVICE MENU ITEMS -------- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>

        {/* ----- OPEN SIDE NAV IN SMALL DEVICE FOR SHOE CATEGORIES------------ */}
        <label htmlFor="my-drawer-2">
          <div tabIndex={1} role="button" className="btn btn-ghost lg:hidden">
            Categories
          </div>
        </label>
      </div>
    </div>
  );
}

export default Header;
