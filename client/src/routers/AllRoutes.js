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
import R from '../pages/User/razo'
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

const AllRoutes = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      {/* <Route path="/cars/:slug" element={<CarDetails />} /> */}
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<Otp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth" element={<Authenticate />} />
      <Route path="/getallcars" element={<NotFound />} />
      <Route path="/booking/:carsid" element={<CarDetails />} />
      <Route path="/r" element={<R />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/userbookings" element={<UserBookings />} />






      {/* <Route
      path="/admin" element={<Navigate to="/admin" exact element={<Alogin />} />}
       /> */}
   <Route path="/admin" element={<Alogin />} />
    <Route path="admin/dashboard" element={<Dashboard />} />
    <Route path="admin/bookings" element={<Bookings />} />
    <Route path="admin/add-car" element={<AddCar />} />
    <Route path="admin/editcar/:carid" element={<EditCar/>} />
    <Route path="admin/sales-report" element={<SalesReport/>} />
    <Route path="/admin/getallusers" element={<Userdetails/>} />

    <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default AllRoutes;
