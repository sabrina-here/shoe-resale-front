import React from "react";
import banner from "../assets/shoe_resale_site_banner.png";

function HomeBanner() {
  return (
    <div>
      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={banner} className="w-full" />
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
