import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: []
}

const categorySlice= createSlice({
    name: "categoriesRedux",
    initialState,
    reducers: {
        setCategory: (state,action) => { 
            state.value= action.payload
        }
    }
})

export const { setCategory }= categorySlice.actions;
export default categorySlice.reducer;