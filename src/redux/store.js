import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice/userSlice.js'
import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js'
import activceTabReducer from './features/ActiveTabSlice/activeTabSlice.js'
import cartItemReducer from './features/CartItemSlice/CartItemSlice.js'
import addressReducer from './features/addressSlices/AddressSlice.js'
import checkoutProductReducer from './features/CheckoutProductSlice/CheckoutProductSlice.js'
import RoleChangeReducers from './features/ownerRedux/roleChangeSlice/roleChangeSlice.js'
import totalPanditListReducer from './features/ownerRedux/totalPanditSlice/totalPanditSlice.js'
import totalSellerListReducer from './features/ownerRedux/totalSellerSlice/totalSellerSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        homeProductsData: homeProductsReducer,
        activeTab: activceTabReducer,
        cartItems: cartItemReducer,
        address: addressReducer,
        checkoutProducts: checkoutProductReducer,
        role_change: RoleChangeReducers,
        pandit_list:totalPanditListReducer,
        seller_list:totalSellerListReducer
    }
})

export default store;