import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageTitle from "../Components/PageTitle";
import Loader from "../Components/Loader";
import MyProductShoeCard from "../PageComponents/MyProductShoeCard";

function MyProducts() {
  const { user } = useContext(AuthContext);

  const {
    data: shoesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allShoes", user.uid],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/allShoes/${user.uid}`,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      return data;
    },
  });

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/allShoes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("deleted successfully");
        refetch();
      });
  };
  if (isLoading) return <Loader></Loader>;

  return (
    <div className=" mx-auto">
      <PageTitle>My Products</PageTitle>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {shoesData.map((shoe) => (
          <MyProductShoeCard
            shoe={shoe}
            key={shoe._id}
            handleDelete={handleDelete}
          ></MyProductShoeCard>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
