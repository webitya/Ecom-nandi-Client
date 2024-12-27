import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

const addProductSlice = createSlice({
    name: 'addProduct',
    initialState,
    reducers: {
        setAddProduct: (state, action) => {
            state.value = action.payload;
        },
        resetAddProduct: (state) => {
            state.value= null
        }
    }
})

export const { setAddProduct,resetAddProduct } = addProductSlice.actions;
export default addProductSlice.reducer;