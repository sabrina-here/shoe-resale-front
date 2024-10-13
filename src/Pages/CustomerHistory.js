import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../Components/Loader";
import PageTitle from "../Components/PageTitle";

function CustomerHistory() {
  const { user } = useContext(AuthContext);

  const {
    data: shoesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payment", user.uid],
    queryFn: async () => {
      const response = await fetch(
        `https://shoe-resale-server.vercel.app/customer/${user.uid}`,
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

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <div className=" mx-auto">
        <PageTitle>My Shopping History</PageTitle>
        <div>
          {shoesData.length === 0 ? (
            <div> You Have no Shopping History </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Brand</th>
                    <th>Price</th>
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
                    </tr>
                  ))}
                </tbody>
                {/* foot */}
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Brand</th>
                    <th>Price</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerHistory;
