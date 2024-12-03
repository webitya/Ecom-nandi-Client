import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        firstName: '',
        lastName: '',
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
            state.value.firstName = action.payload.firstName;
            state.value.lastName = action.payload.lastName
        },
        setDefault: (state) => {
            state.value = {
                firstName: '',
                lastName: '',
                email: '',
                role: null,
            }
        }
    }
})

export const { setUser, setName, setDefault } = userSlice.actions
export default userSlice.reducer