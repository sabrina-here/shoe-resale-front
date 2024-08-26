import React from "react";

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

  return (
    <div>
      <div className="card glass w-72">
        <figure>
          <img src={shoe_image} alt="shoe" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{brand_name}</h2>
          <p>
            ${price}-{heel_height}-{category}
          </p>
          <p>
            {description}, product in {condition} condition
          </p>
          <p>
            purchased in {purchase_year}, Location: {location}
          </p>
          <p>call: {seller_phone}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-neutral">buy now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeCard;
