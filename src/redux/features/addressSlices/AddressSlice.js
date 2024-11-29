import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    value: []
}


const AddressSlices = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        setAddress(state, action) {
            state.value = action.payload
        },
    }
})

export const { setAddress } = AddressSlices.actions

export default AddressSlices.reducer