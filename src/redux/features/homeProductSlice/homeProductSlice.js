import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: [],
};

const homeProductSlice = createSlice({
    name: "homeProductsData",
    initialState,
    reducers: {
        updateProduct: (state, action) => {
            state.value = action.payload
        },
        addProducts: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { addProducts, updateProduct } = homeProductSlice.actions;
export default homeProductSlice.reducer;
