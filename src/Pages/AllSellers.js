import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loader from "../Components/Loader";
import PageTitle from "../Components/PageTitle";
import toast from "react-hot-toast";

function AllSellers() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["admin", "allSellers"],
    queryFn: async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/allSellers`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`Fetching data failed: ${error.message}`);
      }
    },
  });

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/user/admin/deleteSeller/${id}`, {
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
    <div>
      <PageTitle>All Sellers</PageTitle>
      <div>{console.log(data)}</div>
    </div>
  );
}

export default AllSellers;
