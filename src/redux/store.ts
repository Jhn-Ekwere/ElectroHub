import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./auth"
import savedSlice from "./savedSlice"


export const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice,
        saved: savedSlice,
    },
})