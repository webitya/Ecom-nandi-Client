import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    roleChangeList:[]
}

const roleChangeRequest= createSlice({
    name: 'role_change',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.roleChangeList=[ ...action.payload ]
        }
    }
});

export const { setList }= roleChangeRequest.actions;
export default roleChangeRequest.reducer;