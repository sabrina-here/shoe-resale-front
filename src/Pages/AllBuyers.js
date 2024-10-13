import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Loader from "../Components/Loader";
import PageTitle from "../Components/PageTitle";
import toast from "react-hot-toast";
import { AuthContext } from "../Contexts/AuthProvider";
import ConfirmationModal from "../Components/ConfirmationModal";

function AllBuyers() {
  const { userDelete } = useContext(AuthContext);
  const [deleteUser, setDeleteUser] = useState({});
  const {
    data: userData = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "allBuyers"],
    queryFn: async () => {
      try {
        const response = await fetch(
          `https://shoe-resale-server.vercel.app/admin/allBuyers`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        );
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

  const handleDelete = (uid) => {
    fetch(`https://shoe-resale-server.vercel.app/admin/deleteBuyer/${uid}`, {
      //deleting from database
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

  const handleVerify = (user) => {};

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <ConfirmationModal
        modalTitle={"Are you sure you want to Delete"}
        modalText={"Deleting will remove The account of this user permanently."}
        confirmFunction={handleDelete}
        confirmFunctionParam={deleteUser.user_uid}
      ></ConfirmationModal>
      <PageTitle>All Buyers</PageTitle>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      {user.user_image ? (
                        <div className="avatar">
                          <div className="mask mask-circle  w-20">
                            <img
                              src={user.user_image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content w-20 rounded-full">
                            <span className="text-xl">{user.user_name}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    {user.user_email}
                    <br />
                    <span className="badge badge-ghost badge-sm">Customer</span>
                  </td>

                  <th>
                    <button
                      className="btn btn-accent btn-s"
                      onClick={() => handleVerify(user)}
                    >
                      Verify
                    </button>
                  </th>
                  <th>
                    <label
                      htmlFor="confirmModal"
                      className="btn btn-error btn-s"
                      onClick={() => setDeleteUser(user)}
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
                <th>Name</th>
                <th>Email</th>
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

export default AllBuyers;
