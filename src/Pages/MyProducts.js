import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import PageTitle from "../Components/PageTitle";
import Loader from "../Components/Loader";
import ShoeCard from "../Components/ShoeCard";

function MyProducts() {
  const [deleteProduct, setDeleteProduct] = useState({});
  const { user } = useContext(AuthContext);

  const {
    data: shoesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allShoes", user.uid],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5000/allShoes/${user.uid}`
      );
      const data = await response.json();
      return data;
    },
  });

  const handleDeleteDoctors = () => {
    fetch(`http://localhost:5000/allShoes/${deleteProduct._id}`, {
      method: "DELETE",
      // headers: {
      //   authorization: `bearer ${localStorage.getItem("token")}`,
      // },
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
          <ShoeCard shoe={shoe} key={shoe._id}></ShoeCard>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
