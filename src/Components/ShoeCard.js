import React, { useContext } from "react";
import BookingModal from "./BookingModal";
import { AuthContext } from "../Contexts/AuthProvider";

function ShoeCard({ shoe }) {
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
  } = shoe;
  const { user } = useContext(AuthContext);

  return (
    <div>
      <BookingModal shoe={shoe} user={user}></BookingModal>
      <div className="card glass w-72">
        <figure>
          <img src={shoe_image} alt="shoe" />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center">{brand_name}</h2>
          <p className="text-accent font-bold">
            ${price}-{heel_height}-{category}
          </p>
          <p>
            {description}, product in {condition} condition
          </p>
          <p>
            purchased in {purchase_year}, Location: {location}
          </p>
          <p className="font-serif font-bold">call: {seller_phone}</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-neutral"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Book now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeCard;
