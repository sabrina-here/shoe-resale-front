import React from "react";

function PageTitle({ children }) {
  return (
    <div>
      <h2 className="text-2xl text-primary font-bold my-10">{children}</h2>
    </div>
  );
}

export default PageTitle;
