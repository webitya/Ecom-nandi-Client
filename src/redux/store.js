// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from './features/userSlice/userSlice.js'
// import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js'
// import activceTabReducer from './features/ActiveTabSlice/activeTabSlice.js'
// import cartItemReducer from './features/CartItemSlice/CartItemSlice.js'
// import addressReducer from './features/addressSlices/AddressSlice.js'
// import checkoutProductReducer from './features/CheckoutProductSlice/CheckoutProductSlice.js'
// import RoleChangeReducers from './features/ownerRedux/roleChangeSlice/roleChangeSlice.js'
// import totalPanditListReducer from './features/ownerRedux/totalPanditSlice/totalPanditSlice.js'
// import totalSellerListReducer from './features/ownerRedux/totalSellerSlice/totalSellerSlice.js'
// import dashboardSReducer from './features/ownerRedux/dashboardSlice/dashboardSlice.js'

// const store = configureStore({
//     reducer: {
//         user: userReducer,
//         homeProductsData: homeProductsReducer,
//         activeTab: activceTabReducer,
//         cartItems: cartItemReducer,
//         address: addressReducer,
//         checkoutProducts: checkoutProductReducer,
//         role_change: RoleChangeReducers,
//         pandit_list:totalPanditListReducer,
//         seller_list:totalSellerListReducer,
//         dashboard_value: dashboardSReducer,
//     }
// })

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice/userSlice.js';
import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js';
import activceTabReducer from './features/ActiveTabSlice/activeTabSlice.js';
import cartItemReducer from './features/CartItemSlice/CartItemSlice.js';
import addressReducer from './features/addressSlices/AddressSlice.js';
import checkoutProductReducer from './features/CheckoutProductSlice/CheckoutProductSlice.js';
import RoleChangeReducers from './features/ownerRedux/roleChangeSlice/roleChangeSlice.js';
import totalPanditListReducer from './features/ownerRedux/totalPanditSlice/totalPanditSlice.js';
import totalSellerListReducer from './features/ownerRedux/totalSellerSlice/totalSellerSlice.js';
import dashboardSReducer from './features/ownerRedux/dashboardSlice/dashboardSlice.js';

import pageReducer from './features/PageSlice/PageSlice.js';
import bannerReducer from './features/bannerSlice/bannerSlice.js';
import blogReducer from './features/blogsSlice/blogSlice.js';
import categoryReducer from './features/CategorySlice/categorySlice.js'
import orderDataReducer from './features/orderDataSlice/orderDataSlices.js'

const store = configureStore({
    reducer: {
        user: userReducer, // User data and authentication
        homeProductsData: homeProductsReducer, // Home page products
        activeTab: activceTabReducer, // Active tab state
        cartItems: cartItemReducer, // Cart items
        address: addressReducer, // User addresses
        checkoutProducts: checkoutProductReducer, // Checkout products
        role_change: RoleChangeReducers, // Role change for owner
        pandit_list: totalPanditListReducer, // List of pandits
        seller_list: totalSellerListReducer, // List of sellers
        dashboard_value: dashboardSReducer, // Dashboard metrics
        pages: pageReducer, // Dynamic pages reducer,
        bannerImages: bannerReducer,
        blogs: blogReducer,
        categoriesRedux: categoryReducer,
        order: orderDataReducer
    },
});

export default store;