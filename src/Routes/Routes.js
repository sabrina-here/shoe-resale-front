import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home";
import AddProduct from "../Pages/AddProduct";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import MyProducts from "../Pages/MyProducts";
import CategoryProducts from "../Pages/CategoryProducts";
import SellerRoute from "./SellerRoute";
import DashBoard from "../Layouts/DashBoard";
import MyOrders from "../Pages/MyOrders";
import AllSellers from "../Pages/AllSellers";
import AdminRoute from "./AdminRoute";
import AllBuyers from "../Pages/AllBuyers";
import Blogs from "../Pages/Blogs";
import ErrorPage from "../Pages/ErrorPage";
import Payment from "../Pages/Payment";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
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
      {
        path: "/payment/:bookingId",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/booking/payment/${params.bookingId}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "/dashboard/myOrders",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/seller",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/seller/addProduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/admin/allSellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/allBuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default routes;
