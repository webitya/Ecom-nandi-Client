import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    panditList: []
}

const totalPanditSlice= createSlice({
    name: 'pandit_list',
    initialState,
    reducers: {
        setPanditList: (state, action) => {
            state.panditList= action.payload
        }
    }
});

export const { setPanditList }= totalPanditSlice.actions;
export default totalPanditSlice.reducer