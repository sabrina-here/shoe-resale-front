import React, { useState } from "react";
import Header from "../Components/Header";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";

function Main() {
  const [categories, setCategories] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: "categories",
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/categories`);
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
          <ul className="menu bg-base-200 text-base-content  w-80 p-4">
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
