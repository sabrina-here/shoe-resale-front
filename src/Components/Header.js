import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import Loader from "./Loader";
import useSeller from "../Hooks/useSeller";

function Header() {
  const { user, logOut } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/"}>About</Link>
      </li>

      <li>
        <Link to={"/"}>Contact us</Link>
      </li>

      {user?.uid ? (
        <>
          {isSeller ? (
            <li>
              <Link to={"/dashboard/seller"}>DashBoard</Link>
            </li>
          ) : (
            <li>
              <Link to={"/dashboard/myOrders"}>DashBoard</Link>
            </li>
          )}
          <li className="btn btn-outline" onClick={() => logOut()}>
            <Link to={"/"}>Sign Out</Link>
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

  if (user?.uid && isSellerLoading) return <Loader></Loader>;

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
          <Link to={"/"} className="btn btn-ghost text-xl">
            Shoe Resale
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>

        {/* ----- OPEN SIDE NAV IN SMALL DEVICE------------ */}
        <label htmlFor="my-drawer-2">
          <div tabIndex={1} role="button" className="btn btn-ghost lg:hidden">
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
        </label>
      </div>
    </div>
  );
}

export default Header;
