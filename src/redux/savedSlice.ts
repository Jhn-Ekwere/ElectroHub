import { createSlice } from "@reduxjs/toolkit";
import { clearSavedInfo, storeSavedInfo } from "../utils/local_storage";
import { GrActions } from "react-icons/gr";

// create redux to save liked products
interface Product {
    id: string;
    // add other properties if needed
}

interface SavedState {
    likedProducts: Product[];
}

const initialState: SavedState = {
    likedProducts: [],
};

const savedSlice = createSlice({
    name: "saved",
    initialState,
    reducers: {
        storeSavedProducts: (state, action) => {
            state.likedProducts = action.payload;
            storeSavedInfo(state.likedProducts);
        },

        toggleProduct: (state, action) => {
            //   check iiby id if it is in the liked products
            const isLiked = state.likedProducts.find((p) => p.id === action.payload.id);
            // if it is liked, remove it
            if (isLiked) {
                state.likedProducts = state.likedProducts.filter((p) => p.id !== action.payload.id);
            } else {
                // if it is not liked, add it
                state.likedProducts.push(action.payload);
            }
     

            storeSavedInfo(state.likedProducts);
        },
        clearSavedProducts: (state) => {
            state.likedProducts = [];
            clearSavedInfo();
        },
    
    },
});

export const { toggleProduct, clearSavedProducts, storeSavedProducts } = savedSlice.actions;

export default savedSlice.reducer;