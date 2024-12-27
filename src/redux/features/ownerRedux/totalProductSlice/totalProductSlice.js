import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        productLists: [],
    }
}

const totalProductSlice = createSlice({
    name: 'product_list',
    initialState,
    reducers: {
        setProductList: (state, action) => {
            state.value.productLists = action.payload
        }
    }
})

export const { setProductList } = totalProductSlice.actions;
export default totalProductSlice.reducer;