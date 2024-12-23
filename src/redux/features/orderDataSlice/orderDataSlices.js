import { createSlice } from "@reduxjs/toolkit";

const orderDataSlices = createSlice({
    name: 'order',
    initialState: {
        value: []
    },
    reducers: {
        useSetOrder: (state, action) => {
            state.value = action.payload
        }
    }

})

export const {useSetOrder} = orderDataSlices.actions
export default orderDataSlices.reducer