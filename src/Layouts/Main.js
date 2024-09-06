import React, { useState } from "react";
import Header from "../Components/Header";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";

function Main() {
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

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <Header></Header>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/*---------------- Page content here --------------------*/}
          <Outlet></Outlet>

          {/* -------------- Hamburger button for sm device -------- */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-circle swap swap-rotate drawer-button lg:hidden"
          >
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content h-full  w-80 p-4">
            {/* Sidebar content here */}
            {categories?.map((category, index) => (
              <li key={index}>
                <Link to={`/categoryProducts/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Main;
