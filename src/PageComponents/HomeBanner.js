import React from "react";

function HomeBanner() {
  return (
    <div>
      <div className="carousel w-full lg:w-11/12 rounded">
        <div id="slide1" className="carousel-item relative w-full">
          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <div className="bg-base-200 grid place-content-center text-9xl font-black">
                SHOES
              </div>
            </div>
            <div className="diff-item-2">
              <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
                SHOES
              </div>
            </div>

            <div className="diff-resizer"></div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <div className="bg-accent text-accent-content grid place-content-center text-9xl font-black">
                YOU
              </div>
            </div>
            <div className="diff-item-2">
              <div className="bg-base-200  grid place-content-center text-9xl font-black">
                YOU
              </div>
            </div>

            <div className="diff-resizer"></div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <div className="bg-base-200 grid place-content-center text-9xl font-black">
                WILL
              </div>
            </div>
            <div className="diff-item-2">
              <div className="bg-primary text-primary-content grid place-content-center text-9xl font-black">
                WILL
              </div>
            </div>

            <div className="diff-resizer"></div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide4" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <div className="diff aspect-[16/9]">
            <div className="diff-item-1">
              <div className="bg-secondary text-secondary-content grid place-content-center text-9xl font-black">
                LOVE
              </div>
            </div>
            <div className="diff-item-2">
              <div className=" bg-base-200 grid place-content-center text-9xl font-black">
                LOVE
              </div>
            </div>

            <div className="diff-resizer"></div>
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a href="#slide3" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
