import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice/userSlice.js'
import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js'
import activceTabReducer from './features/ActiveTabSlice/activeTabSlice.js'
import cartItemReducer from './features/CartItemSlice/CartItemSlice.js'


const store = configureStore({
    reducer: {
        user: userReducer,
        homeProductsData: homeProductsReducer,
        activeTab: activceTabReducer,
        cartItems: cartItemReducer,
    }
})

export default store;