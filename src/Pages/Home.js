import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HomeBanner from "../PageComponents/HomeBanner";
import PageTitle from "../Components/PageTitle";
import loafer from "../assets/loafer.jpg";
import blush from "../assets/blushKate.jpg";
import Loader from "../Components/Loader";
import ShoeCard from "../Components/ShoeCard";

function Home() {
  const {
    data: shoesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["advertisedProducts"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/advertisedProducts`);
      const data = await response.json();
      return data;
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      {/* ------- Banner ------- */}
      <HomeBanner></HomeBanner>

      {/* -------- Advertise section -------- */}
      <div className="my-10">
        <PageTitle>Advertised Products</PageTitle>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {shoesData.map((shoe) => (
            <ShoeCard key={shoe._id} shoe={shoe}></ShoeCard>
          ))}
        </div>
      </div>

      {/* --------- Extra Section --------- */}
      <div className="my-10 ">
        <div>
          <PageTitle>Popular Products</PageTitle>
        </div>
        <div className="flex w-full">
          <div className="card  rounded-box grid  flex-grow place-items-center">
            <div className="block">
              <img className="mask mask-heart" src={blush} />
            </div>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card  rounded-box grid flex-grow place-items-center">
            <div className="block">
              <img className="mask mask-squircle" src={loafer} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
