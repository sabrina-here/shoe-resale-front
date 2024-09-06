import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import Loader from "../Components/Loader";
import PageTitle from "../Components/PageTitle";
import toast from "react-hot-toast";
import { AuthContext } from "../Contexts/AuthProvider";
import { Link } from "react-router-dom";

function Myorders() {
  const { user } = useContext(AuthContext);

  const {
    data: shoesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking", user.uid],
    queryFn: async () => {
      const response = await fetch(
        `https://shoe-resale-server.vercel.app/booking/${user.uid}`,
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
    fetch(`https://shoe-resale-server.vercel.app/booking/${id}`, {
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
      <PageTitle>My orders</PageTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Brand</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {shoesData?.map((shoe, index) => (
                <tr key={shoe._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-circle  w-20">
                          <img
                            src={shoe.shoe_image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">{shoe.brand_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {shoe.shoe_price}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {shoe.description}
                    </span>
                  </td>

                  <th>
                    <button className="btn btn-accent btn-s">
                      <Link to={`/payment/${shoe._id}`}>Pay</Link>
                    </button>
                  </th>
                  <th>
                    <label
                      htmlFor="confirmModal"
                      className="btn btn-error btn-s"
                      onClick={() => handleDelete(shoe._id)}
                    >
                      Delete
                    </label>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Brand</th>
                <th>Price</th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Myorders;
