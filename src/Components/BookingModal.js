import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function BookingModal({ shoe, user }) {
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
  const shoeInfo = `${brand_name}-$${price}-heel height: ${heel_height}-${category}-${description}, product in ${condition} condition`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const meet_locationRef = useRef();
  const customer_phoneRef = useRef();

  const handleBooking = () => {
    const booking = {
      seller_id: shoe.seller_id,
      shoe_id: shoe._id,
      seller_phone: seller_phone,
      seller_location: location,
      shoe_price: price,
      shoe_image: shoe_image,
      brand_name: brand_name,
      description: description,
      heel_height: heel_height,
      purchase_year: purchase_year,
      customer_id: user.uid,
      sale_status: "booked",
      customer_phone: customer_phoneRef.current?.value,
      meet_location: meet_locationRef.current?.value,
    };

    console.log(booking);
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`Product Booked successfully`);
        if (customer_phoneRef.current) customer_phoneRef.current.value = "";
        if (meet_locationRef.current) meet_locationRef.current.value = "";
      });
  };

  return (
    <div>
      <div>
        <input type="checkbox" id="bookingModal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <div className="modal-action">
              <label
                htmlFor="bookingModal"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </label>
            </div>
            <button></button>
            <form method="dialog">
              {/* ------- Shoe Information --------- */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Shoe Information</span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  value={shoeInfo}
                  readOnly
                ></textarea>
              </label>

              {/* ----------- Seller Location --------- */}
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Seller Location</span>
                </div>
                <input
                  type="text"
                  value={location}
                  readOnly
                  className="input input-bordered w-full "
                />
              </label>

              {/* --------------- Seller Phone Number ------------ */}
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">Seller Contact</span>
                </div>
                <input
                  type="text"
                  value={seller_phone}
                  readOnly
                  className="input input-bordered w-full "
                />
              </label>

              {/* ------------- Meeting Location --------------- */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Add Your Prefered Meeting Location
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  ref={meet_locationRef}
                  required
                />
              </label>

              {/* ----------------- Your Contact Number --------------- */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Add Your Contact Number</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full "
                  ref={customer_phoneRef}
                  required
                />
              </label>

              <div className="modal-action">
                <label
                  htmlFor="bookingModal"
                  className="btn btn-accent"
                  onClick={handleBooking}
                >
                  Confirm Booking
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
