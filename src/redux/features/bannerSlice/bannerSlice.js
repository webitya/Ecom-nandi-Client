import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: []
}

const bannnerSlice= createSlice({
    name: "bannerImages",
    initialState,
    reducers: {
        setBanners: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { setBanners } = bannnerSlice.actions;
export default bannnerSlice.reducer