import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    currentPage: 1,
    hasMore: true,
};

export const homeProductSlice = createSlice({
    name: "homeProductsData",
    initialState,
    reducers: {
        updateProduct(state, action) {
            state.products = [...state.products, ...action.payload.products];
            state.currentPage = action.payload.currentPage;
            state.hasMore = action.payload.hasMore;
        },
        resetProduct(state) {
            state.products = [];
            state.currentPage = 1;
            state.hasMore = true;
        },
    },
});

export const { updateProduct, resetProduct } = homeProductSlice.actions;

export default homeProductSlice.reducer;
