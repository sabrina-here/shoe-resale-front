import React from "react";
import { Link, useRouteError } from "react-router-dom";
import errorImage from "../assets/404.jpg";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="w-9/12 m-auto">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={errorImage} className="max-w-md rounded-lg shadow-2xl" />
          <div>
            <p className="text-3xl text-red-950 my-5">
              Something went wrong !!
            </p>
            <p className="text-xl text-red-600 my-5">
              {error.statusText || error.message}
            </p>
            <p>
              <Link to={"/"} className="link link-accent text-xl">
                Back to Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
