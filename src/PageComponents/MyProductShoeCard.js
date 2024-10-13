import React, { useEffect, useState } from "react";
import BookingModal from "../Components/BookingModal";
import Loader from "../Components/Loader";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function MyProductShoeCard({ shoe, handleDelete }) {
  const {
    brand_name,
    category,
    condition,
    description,
    heel_height,
    location,
    price,
    purchase_year,
    seller_phone,
    shoe_image,
    sale_status,
  } = shoe;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["advertised", shoe._id],
    queryFn: async () => {
      const response = await fetch(
        `https://shoe-resale-server.vercel.app/advertised/${shoe._id}`,
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

  const handleAdvertise = (shoe) => {
    shoe.shoe_id = shoe._id;
    if (shoe.sale_status === "available") {
      fetch("https://shoe-resale-server.vercel.app/advertise", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(shoe),
      })
        .then((res) => res.json())
        .then((data) => {
          toast.success(`Product Advertising successful`);
          refetch();
        });
    } else toast.error("Cannot advertise Sold of Booked Products");
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <div>
        <BookingModal shoe={shoe}></BookingModal>
        <div className="card glass w-72">
          <figure>
            <img src={shoe_image} alt="shoe" />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center">{brand_name}</h2>
            <p className="text-accent font-bold">
              ${price}-{heel_height}-{category}
            </p>
            <p className="font-bold">
              Status:{" "}
              <span
                className={
                  sale_status === "available" ? "text-info" : "text-success"
                }
              >
                {sale_status}
              </span>
            </p>
            <p className="font-serif font-bold">call: {seller_phone}</p>
            <div className="card-actions justify-between">
              <button
                className="btn btn-error"
                onClick={() => handleDelete(shoe._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-accent"
                onClick={() => handleAdvertise(shoe)}
                disabled={data}
              >
                Advertise
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProductShoeCard;
