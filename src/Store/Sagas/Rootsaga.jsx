import{all} from "redux-saga/effects";


import maincategorySaga from './Services/MaincategorySaga';
import subcategorySaga from './Services/SubcategorySaga';
import brandSaga from './Services/BrandSaga';
import productSaga from './Services/ProductSaga';
import testimonialSaga from './Services/TestimonialSaga';
import cartSaga from './Services/CartSaga';
import wishlistSaga from './Services/WishlistSaga';
import checkoutSaga from './Services/CheckoutSaga';
import newsletterSaga from './Services/NewsletterSaga';
import contactusSaga from './Services/ContactusSaga';

export default function* RootSaga(){
    yield all([
        maincategorySaga(),
        subcategorySaga(),
        brandSaga(),
        productSaga(),
        testimonialSaga(),
        cartSaga(),
        wishlistSaga(),
        checkoutSaga(),
        newsletterSaga(),
        contactusSaga(),
        
    ])

}