import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/User/Home";
import About from "../pages/User/About";
import CarListing from "../pages/User/CarListing";
import CarDetails from "../pages/User/CarDetails";
import Blog from "../pages/User/Blog";
import BlogDetails from "../pages/User/BlogDetails";
import NotFound from "../pages/User/NotFound";
import Contact from "../pages/User/Contact";
import Login from "../pages/User/Login";
import Otp from "../pages/User/OtpForm";
import R from "../pages/User/razo";
import Register from "../pages/User/Register";
import Dashboard from "../pages/Admin/Dashboard";
import Bookings from "../pages/Admin/Bookings";
import ForgotPassword from "../pages/User/ForgotPassword";
import AddCar from "../pages/Admin/AddCar";
import EditCar from "../pages/Admin/EditCar";
import Authenticate from "../components/UserComponents/Authenticate/Authenticate";
import Userdetails from "../components/UserComponents/userdetails/userdetails";
import SalesReport from "../pages/Admin/SalesReport";
import Orders from "../pages/User/Orders";
import UserBookings from "../pages/User/UserBookings";
import Alogin from "../pages/Admin/Alogin";
import UserProfile from "../pages/User/UserProfile";
import CarUsa from "../pages/User/CarUsa";
import CarUk from "../pages/User/CarUk";
import CarCanada from "../pages/User/CarCanada";
import CarIndia from "../pages/User/CarIndia";
import Protected from "../components/PrivatePublicRoutes/Protected";
import Public from "../components/PrivatePublicRoutes/Public";
import AdminOnly from "../components/AdminPrivatePublic/AdminOnly";

const AllRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/home" />} /> */}

      {/* <Route path="/home" element={


      <Public>
      <Home />
     </Public>
      

      } /> */}

      <Route
        path="/"
        element={
          // localStorage.getItem("token") ? (
          //   <Protected>
              <Home />
          //   </Protected>
          // ) : (
          //   <Public>
          //     <Home />
          //   </Public>
          // )
        }
      />

      <Route
        path="/login"
        element={
          <Public>
            <Login />
         </Public>
        }
      />

      <Route
        path="/register"
        element={
          <Public>
            <Register />
         </Public>
        }
      />

      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      {/* <Route path="/cars/:slug" element={<CarDetails />} /> */}
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/verify-otp" element={<Otp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth" element={<Authenticate />} />
      <Route path="/getallcars" element={<NotFound />} />

      <Route
        path="/booking/:carsid"
        element={
          <Protected>
            <CarDetails />
           </Protected>
        }
      />

      <Route path="/r" element={<R />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/userbookings" element={<UserBookings />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/trivandrum" element={<CarUsa />} />
      <Route path="/ernakulam" element={<CarUk />} />
      <Route path="/kozhikode" element={<CarCanada />} />
      <Route path="/ffgt" element={<CarIndia />} />

      {/* <Route
      path="/admin" element={<Navigate to="/admin" exact element={<Alogin />} />}
       /> */}
      <Route
        path="/admin"
        element={
          <AdminOnly>
            <Alogin />
          </AdminOnly>
        }
      />
      <Route
        path="admin/dashboard"
        element={
          <AdminOnly>
            <Dashboard />
          </AdminOnly>
        }
      />
      <Route
        path="admin/bookings"
        element={
          <AdminOnly>
            <Bookings />
          </AdminOnly>
        }
      />
      <Route
        path="admin/add-car"
        element={
          <AdminOnly>
            <AddCar />
          </AdminOnly>
        }
      />
      <Route
        path="admin/editcar/:carid"
        element={
          <AdminOnly>
            <EditCar />
          </AdminOnly>
        }
      />
      <Route
        path="admin/sales-report"
        element={
          <AdminOnly>
            <SalesReport />
          </AdminOnly>
        }
      />
      <Route
        path="/admin/getallusers"
        element={

          <AdminOnly>
            <Userdetails />
          </AdminOnly>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
