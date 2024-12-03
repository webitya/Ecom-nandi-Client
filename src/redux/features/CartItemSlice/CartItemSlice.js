import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    values: [],
};

const CartSlices = createSlice({
    name: "cartItems",
    initialState,
    reducers: {
        setCartItem(state, action) {
            state.values = action.payload;
        },
        removeCartItem(state, action) {
            state.values = state.values.filter(
                (item) => item.products._id !== action.payload
            );
        },
        updateCartItemQuantity(state, action) {
            const { id, quantity } = action.payload;
            const itemIndex = state.values.findIndex(
                (item) => item.products._id === id
            );
            if (itemIndex >= 0) {
                state.values[itemIndex].quantity = quantity;
            }
        },
        addProductToCart(state, action) {
            state.values.push(action.payload)
        }
    },
});

export const { setCartItem, removeCartItem, updateCartItemQuantity, addProductToCart } =
    CartSlices.actions;
export default CartSlices.reducer;
