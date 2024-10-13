import React, { useContext } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ShoeCard({ shoe, handleShoeBooking }) {
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
  const navigate = useNavigate();

  const handleBooking = () => {
    if (!user) navigate("/login");
    handleShoeBooking(shoe);
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(0,0,0)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div>
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
            <motion.label
              className="btn btn-neutral"
              htmlFor="bookingModal"
              onClick={handleBooking}
              variants={buttonVariants}
              whileHover="hover"
            >
              Book now!
            </motion.label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeCard;
