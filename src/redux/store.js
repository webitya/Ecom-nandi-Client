import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice/userSlice.js'
import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js'
import activceTabReducer from './features/ActiveTabSlice/activeTabSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        homeProductsData: homeProductsReducer,
        activeTab: activceTabReducer,
    }
})

export default store;