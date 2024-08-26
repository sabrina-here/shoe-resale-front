import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import HomeBanner from "../PageComponents/HomeBanner";
import PageTitle from "../Components/PageTitle";
import loafer from "../assets/loafer.jpg";
import blush from "../assets/blushKate.jpg";

function Home() {
  return (
    <div>
      {/* ------- Banner ------- */}
      <HomeBanner></HomeBanner>

      {/* -------- Advertise section -------- */}
      <div>
        <PageTitle>Popular Products</PageTitle>
      </div>

      {/* --------- Extra Section --------- */}
      <div className="my-10">
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
