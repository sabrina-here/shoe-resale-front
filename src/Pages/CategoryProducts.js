import React from "react";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import ShoeCard from "../Components/ShoeCard";

function CategoryProducts() {
  const data = useLoaderData();
  console.log(data);
  if (data) {
    return (
      <div>
        <div>
          <PageTitle>{data[0].category}</PageTitle>
        </div>
        <div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data.map((shoe) => (
              <ShoeCard shoe={shoe} key={shoe._id}></ShoeCard>
            ))}
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <PageTitle>No products Available </PageTitle>
      </div>
    );
}

export default CategoryProducts;
