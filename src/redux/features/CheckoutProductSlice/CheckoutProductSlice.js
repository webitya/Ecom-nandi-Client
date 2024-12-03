import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value: []
}

const CheckoutProductSlice = createSlice({
    name: "checkoutProducts",
    initialState: initialState,
    reducers: {
        setCheckoutProducts(state, action) {
            state.value = action.payload
        },
    }
})

export const { setCheckoutProducts } = CheckoutProductSlice.actions
export default CheckoutProductSlice.reducer