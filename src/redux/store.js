import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice/userSlice.js'
import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js'
import activceTabReducer from './features/ActiveTabSlice/activeTabSlice.js'
import cartItemReducer from './features/CartItemSlice/CartItemSlice.js'
import addressReducer from './features/addressSlices/AddressSlice.js'
import checkoutProductReducer from './features/CheckoutProductSlice/CheckoutProductSlice.js'


const store = configureStore({
    reducer: {
        user: userReducer,
        homeProductsData: homeProductsReducer,
        activeTab: activceTabReducer,
        cartItems: cartItemReducer,
        address: addressReducer,
        checkoutProducts: checkoutProductReducer
    }
})

export default store;