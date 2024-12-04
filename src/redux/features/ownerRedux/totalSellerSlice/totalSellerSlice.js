import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    sellerList: []
}

const totalSellerSlice= createSlice({
    name: 'seller_list',
    initialState,
    reducers: {
        setSellerList: (state, action) => {
            state.sellerList= action.payload
        }
    }
});

export const { setSellerList }= totalSellerSlice.actions;
export default totalSellerSlice.reducer;