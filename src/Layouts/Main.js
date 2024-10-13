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
      <div className="mx-auto w-4/5">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default Main;
