import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";
import wishlstSlice from "./slice/wishlistSlice";
import cartSlice from "./slice/cartSlice";

const cartStore = configureStore({
    reducer:{
        productReducer : productSlice,
        wishlistReducer : wishlstSlice,
        cartReducer : cartSlice
    }
})

export default cartStore