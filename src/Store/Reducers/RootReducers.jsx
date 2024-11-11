import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducers from "./MaincategoryReducers";
import SubcategoryReducers from "./SubcategoryReducers";
import BrandReducers from "./BrandReducers";
import ProductReducers from "./ProductReducers";
import TestimonialReducers from "./TestimonialReducers";
import CartReducers from "./CartReducers";
import WishlistReducers from "./WishlistReducers";
import CheckoutReducers from "./CheckoutReducers";
import NewsletterReducers from "./NewsletterReducers";
import ContactReducers from "./ContactReducers";

export default combineReducers({
MaincategoryStateData: MaincategoryReducers,
SubcategoryStateData: SubcategoryReducers,
BrandStateData: BrandReducers,
ProductStateData: ProductReducers,
TestimonialStateData: TestimonialReducers,
CartStateData: CartReducers,
WishlistStateData: WishlistReducers,
CheckoutStateData: CheckoutReducers,
NewsletterStateData: NewsletterReducers,
ContactStateData: ContactReducers,
})

