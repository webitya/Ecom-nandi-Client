import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 'profile',
}

const activeTabSlice = createSlice({
    name: 'activeTab',
    initialState,
    reducers: {
        changeTab: (state, action) => {
            state.value = action.payload
        },

    }
});

export const { changeTab } = activeTabSlice.actions;
export default activeTabSlice.reducer;