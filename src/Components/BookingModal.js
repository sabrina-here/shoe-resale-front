import React from "react";
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

  const onSubmit = (data) => {
    data.shoe_id = shoe._id;
    data.seller_id = shoe.seller_id;
    data.seller_phone = seller_phone;
    data.seller_location = location;
    data.shoe_price = price;
    data.shoe_image = shoe_image;
    data.brand_name = brand_name;
    data.description = description;
    data.heel_height = heel_height;
    data.purchase_year = purchase_year;
    data.customer_id = user.uid;
    data.sale_status = "booked";
    console.log(data);
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`Product Booked successfully`);
      });
  };

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* ------- Shoe Information --------- */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Shoe Information</span>
              </div>
              <textarea
                className="textarea textarea-bordered"
                value={shoeInfo}
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
                {...register("meet_location", {
                  required: "Meeting Location is required",
                })}
              />
              {errors.meet_location && (
                <p className="text-red-600">{errors.email?.message}</p>
              )}
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
                {...register("customer_phone", {
                  required: "Your Contact is required",
                })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.customer_phone?.message}</p>
              )}
            </label>

            <form method="dialog">
              <button
                type="submit"
                className="btn  btn-accent w-full text-white text-2xl my-4"
              >
                Book Now
              </button>
            </form>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default BookingModal;
