import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/UserPages/Home";
import About from "../pages/UserPages/About";
import CarListing from "../pages/UserPages/CarListing";
import CarDetails from "../pages/UserPages/CarDetails";
import Blog from "../pages/UserPages/Blog";
import BlogDetails from "../pages/UserPages/BlogDetails";
import BlogDetails from "../pages/User/Orders";

// import NotFound from "../pages/UserPages/NotFound";
import Contact from "../pages/UserPages/Contact";
import Login from "../pages/UserPages/Login";
import Register from "../pages/UserPages/Register";

const UserRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default UserRouters;
