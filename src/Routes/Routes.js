import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AddProduct from "../Pages/AddProduct";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import MyProducts from "../Pages/MyProducts";
import CategoryProducts from "../Pages/CategoryProducts";
import SellerLayout from "../Layouts/SellerLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/categoryProducts/:cat",
        element: <CategoryProducts />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/allShoes/category/${params.cat}`),
      },
    ],
  },
  {
    path: "/seller",
    element: <SellerLayout></SellerLayout>,
    children: [
      {
        path: "/seller",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/seller/addProduct",
        element: <AddProduct></AddProduct>,
      },
    ],
  },
]);

export default routes;
