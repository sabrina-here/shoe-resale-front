import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";
import toast from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        toast("User created successfully");
        navigate(from, { replace: true });
      })
      .catch((e) => console.log(e));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        toast("User created successfully");
        navigate(from, { replace: true });
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="h-[800px] flex justify-center items-center border-2">
      <div className="w-96 border-1">
        <h2 className="text-4xl font-bold text-center my-3">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("name", { required: "name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name?.message}</p>
            )}
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("email", { required: "Email Address is required" })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full "
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 characters or longer",
                },
              })}
            />
            <div className="label">
              <span className="label-text text-xs">Forgot Password ?</span>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </label>

          <input
            className="btn btn-accent w-full text-white text-2xl my-4"
            value={"Sign Up"}
            type="submit"
          />
        </form>
        <p className="text-center text-sm">
          Already have an account ?{" "}
          <Link to={"/login"} className="text-secondary">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full" onClick={handleGoogleSignIn}>
          CONTINUE WITH GOOGLE
        </button>
      </div>
    </div>
  );
}

export default Signup;
