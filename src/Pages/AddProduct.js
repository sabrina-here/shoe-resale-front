import React, { useContext, useState } from "react";
import { AuthContext } from "../Contexts/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import PageTitle from "../Components/PageTitle";

function AddProduct() {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: "categories",
    queryFn: async () => {
      const response = await fetch(
        `https://shoe-resale-server.vercel.app/categories`
      );
      const data = await response.json();
      setCategories(data[0].categories);
      return data;
    },
  });

  const imgHostKey = process.env.REACT_APP_imgbb_key;
  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.seller_id = user.uid;
    data.sale_status = "available";
    const image = data.shoe_image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const imgUrl = imgData.data.url;
        data.shoe_image = imgUrl;

        // save doctor info in database
        fetch("https://shoe-resale-server.vercel.app/addProduct", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            toast.success(`Product added successfully`);
            navigate("/dashboard/seller");
          });
      });
  };

  if (isLoading) return <Loader></Loader>;

  return (
    <div className="lg:w-2/5 md:w-1/2 sm:w-full mx-auto">
      <div>
        <PageTitle>Add A Product</PageTitle>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* -------- Phone number ----------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Phone number</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("seller_phone", {
                required: "phone number is required",
              })}
            />
            {errors.seller_phone && (
              <p className="text-red-600">{errors.seller_phone?.message}</p>
            )}
          </label>

          {/* -------- Location ------------- */}
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Location</span>
            </div>
            <select
              className="select select-bordered w-full max-w-s"
              {...register("location", {
                required: "location is required",
              })}
            >
              <option>Dhaka</option>
              <option>Chattogram</option>
              <option>Sylhet</option>
              <option>Barishal</option>
              <option>Rajshahi</option>
              <option>Mymensingh</option>
              <option>Khulna</option>
            </select>
            {errors.specialty && (
              <p className="text-red-600">{errors.specialty?.message}</p>
            )}
          </label>

          {/* --------- Brand Name ----------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select Brand Name</span>
            </div>
            <select
              className="select select-bordered w-full max-w-s"
              {...register("brand_name", {
                required: "Brand name is required",
              })}
            >
              <option>Nike</option>
              <option>Adidas</option>
              <option>Christian Loubotin</option>
              <option>Jimmy Choo</option>
              <option>Manolo Blahnik</option>
              <option>Gucci</option>
              <option>Steve Madden</option>
              <option>Birkenstock</option>
              <option>Stuart Weitzman</option>
              <option>Tory Burch</option>
              <option>Miscellaneous</option>
            </select>
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </label>

          {/* ------------ Price --------------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Price</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("price", {
                required: "price is required",
              })}
            />
            {errors.seller_phone && (
              <p className="text-red-600">{errors.price?.message}</p>
            )}
          </label>

          {/* ----------------- Shoe Condition --------------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select Shoe Condition</span>
            </div>
            <select
              className="select select-bordered w-full max-w-s"
              {...register("condition", {
                required: "Condition is required",
              })}
            >
              <option>Excellent</option>
              <option>Good</option>
              <option>Fair</option>
            </select>
            {errors.condition && (
              <p className="text-red-600">{errors.condition?.message}</p>
            )}
          </label>

          {/* -------------------- Select shoe Category ------------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select shoe Category</span>
            </div>
            <select
              className="select select-bordered w-full max-w-s"
              {...register("category", {
                required: "category is required",
              })}
            >
              {categories?.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-600">{errors.category?.message}</p>
            )}
          </label>

          {/* --------------------- Product Description ---------------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Bio"
              {...register("description", {
                required: "description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-600">{errors.description?.message}</p>
            )}
          </label>

          {/* -------------------- Purchase Year ---------------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Purchase Year</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("purchase_year", {
                required: "purchase year is required",
              })}
            />
            {errors.purchase_year && (
              <p className="text-red-600">{errors.purchase_year?.message}</p>
            )}
          </label>

          {/* -------------------- Heel Height ----------------- */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Heel Height</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("heel_height", {
                required: "heel height is required",
              })}
            />
            {errors.heel_height && (
              <p className="text-red-600">{errors.heel_height?.message}</p>
            )}
          </label>

          {/* -------------------- Upload Shoe Image ------------ */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Upload Shoe Image</span>
            </div>
            <input
              type="file"
              placeholder="upload image"
              className="file-input file-input-bordered w-full "
              {...register("shoe_image", {
                required: "Shoe Image is required",
              })}
            />
            {errors.shoe_image && (
              <p className="text-red-600">{errors.shoe_image?.message}</p>
            )}
          </label>

          <input
            className="btn bg-base-content w-full text-white text-2xl my-4"
            value={"Add Shoe"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
