import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import PageTitle from "../Components/PageTitle";
import ShoeCard from "../Components/ShoeCard";
import BookingModal from "../Components/BookingModal";
import { AuthContext } from "../Contexts/AuthProvider";

function CategoryProducts() {
  const data = useLoaderData();
  const [shoe, setShoe] = useState({});
  const { user } = useContext(AuthContext);

  const handleShoeBooking = (shoeData) => {
    console.log(shoeData);
    setShoe(shoeData);
  };

  if (data) {
    return (
      <div>
        <BookingModal
          shoe={shoe}
          user={user}
          handleShoeBooking={handleShoeBooking}
        ></BookingModal>

        <div>
          <PageTitle>{data[0].category}</PageTitle>
        </div>
        <div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {data.map((shoe) => (
              <ShoeCard
                shoe={shoe}
                handleShoeBooking={handleShoeBooking}
                key={shoe._id}
              ></ShoeCard>
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
