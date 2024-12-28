import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./partials/Navbar";
import Footer from "./partials/Footer";
import Home from "./Home";
import About from "./About";
import Contactus from "./Contactus";
import Error from "./Error";
import Shop from "./Shop";
import AdminHome from "./admin/AdminHome";
import AdminMaincategory from "./admin/maincategory/AdminMaincategory";
import AdminCreateMaincategory from "./admin/maincategory/AdminCreateMaincategory";
import AdminUpdateMaincategory from "./admin/maincategory/AdminUpdateMaincategory ";
import AdminCreateSubcategory from "./admin/Subcategory/AdminCreateSubcategory";
import AdminSubcategory from "./admin/Subcategory/AdminSubcategory";
import AdminUpdateSubcategory from "./admin/Subcategory/AdminUpdateSubcategory ";
import AdminBrand from "./admin/Brand/AdminBrand";
import AdminCreateBrand from "./admin/Brand/AdminCreateBrand";
import AdminUpdateBrand from "./admin/Brand/AdminUpdateBrand ";
import AdminProduct from "./admin/Product/AdminProduct";
import AdminCreateProduct from "./admin/Product/AdminCreateProduct";
import AdminUpdateProduct from "./admin/Product/AdminUpdateProduct";

import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import Cart from "./Cart";
import Product from "./Product";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import AdminNewsletter from "./admin/Newsletter/AdminNewsletter";
import AdminCheckout from "./admin/Checkout/AdminCheckout";
import AdminContact from "./admin/Contact/AdminContact";
import Testimonial from "./partials/Testimonial";

// Testimonial
import AdminTestimonial from "./admin/Testimonial/AdminTestimonial";
import AdminCreateTestimonial from "./admin/Testimonial/AdminCreateTestimonial";
import AdminUpdateTestimonial from "./admin/Testimonial/AdminUpdateTestimonial ";
import AdminUsers from "./admin/AdminUsers/AdminUsers";


export default function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contactus/>} />
        <Route path="/shop" element={<Shop/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/product/:_id" element={<Product/>}/>
     

   
   
     {/* Buyer Routes */}
     <Route path="/profile" element={<Profile/>} />
     <Route path="/update-profile" element={<UpdateProfile/>} />
     <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/confirmation" element={<Confirmation/>} />
{/* Admin routes */}
<Route path="/admin" element={<AdminHome/>} />

<Route path="/admin/maincategory" element={<AdminMaincategory/>} />
<Route path="/admin/maincategory/create" element={<AdminCreateMaincategory/>} />
<Route path="/admin/maincategory/update/:_id" element={<AdminUpdateMaincategory/>} />

<Route path="/admin/subcategory" element={<AdminSubcategory/>} />
<Route path="/admin/subcategory/create" element={<AdminCreateSubcategory/>} />
<Route path="/admin/subcategory/update/:_id" element={<AdminUpdateSubcategory/>} />

<Route path="/admin/brand" element={<AdminBrand/>} />
<Route path="/admin/brand/create" element={<AdminCreateBrand/>} />
<Route path="/admin/brand/update/:_id" element={<AdminUpdateBrand/>} />
{/* Testimonial */}

<Route path="/admin/testimonial" element={<AdminTestimonial/>} />
<Route path="/admin/testimonial/create" element={<AdminCreateTestimonial/>} />
<Route path="/admin/testimonial/update/:_id" element={<AdminUpdateTestimonial/>} />

<Route path="/admin/testimonial" element={<Testimonial/>} />

<Route path="/admin/product" element={<AdminProduct/>} />
<Route path="/admin/product/create" element={<AdminCreateProduct/>} />
<Route path="/admin/product/update/:_id" element={<AdminUpdateProduct/>} />
<Route path="/admin/newsletter" element={<AdminNewsletter/>} />
<Route path="/admin/user" element={<AdminUsers/>} />
<Route path="/admin/checkout" element={<AdminCheckout/>} />
<Route path="/admin/contact" element={<AdminContact/>} />

        <Route path="/*" element={<Error/>} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}
