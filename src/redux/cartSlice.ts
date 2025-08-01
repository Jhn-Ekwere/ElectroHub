import { createSlice } from "@reduxjs/toolkit";
import { clearCartInfo, storeCartInfo } from "../utils/local_storage";

interface CartItem {
  id: string;
  price: number;
  cartQuantity: number;
}

const initialState: {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
} = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    storeCart: (state, action) => {
      let payload = action.payload;
      state.cartItems = payload.cartItems;
      state.cartTotalQuantity = payload.cartTotalQuantity;
      state.cartTotalAmount = payload.cartTotalAmount;

      storeCartInfo(state);
    },
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        state.cartTotalQuantity += 1;
        state.cartTotalAmount += state.cartItems[itemIndex].price;
      } else {
        const productTemplate = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(productTemplate);
        state.cartTotalQuantity += 1;
        state.cartTotalAmount += productTemplate.price;
      }
      storeCartInfo(state);
    },
    deleteFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload);
      if (itemIndex >= 0) {
        const cartQuantity = state.cartItems[itemIndex].cartQuantity;
        if (cartQuantity <= 1) {
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= state.cartItems[itemIndex].price;
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        } else {
          state.cartTotalQuantity -= 1;
          state.cartTotalAmount -= state.cartItems[itemIndex].price;
          state.cartItems[itemIndex].cartQuantity -= 1;
        }
      }
      storeCartInfo(state);
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      clearCartInfo();
    },
  },
});

export const { addToCart, deleteFromCart, clearCart, storeCart } = cartSlice.actions;
export default cartSlice.reducer;
