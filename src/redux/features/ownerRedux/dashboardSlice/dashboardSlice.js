import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        totalUser: 0,
        totalpandit: 0,
        totalseller: 0,
        totalPendingRequest: 0,
        totalProducts: 0,
        totalPanditBooking: 0,
    }
}

const dashboardSlice= createSlice({
    name:'dashboard_value',
    initialState,
    reducers: {
        updateDashboardValue: (state, action) => {
            state.value= action.payload
        },
        updateParticularValue: (state, action) => {
            state.value= { ...state.value, [action.payload.name]: action.payload.value}
        }
    }
})

export const { updateDashboardValue,updateParticularValue } = dashboardSlice.actions;
export default dashboardSlice.reducer;