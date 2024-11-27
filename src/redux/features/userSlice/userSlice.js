import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        fname: '',
        lname: '',
        email: '',
        role: null,
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.value = action.payload;
        },
        setName: (state, action) => {
            state.value.fname = action.payload.fname;
            state.value.lname = action.payload.lname
        }

    }
})

export const { setUser, setName } = userSlice.actions
export default userSlice.reducer