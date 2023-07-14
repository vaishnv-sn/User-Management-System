import { createSlice } from "@reduxjs/toolkit";

let INITIAL_STATE = { userDetails: {} }

const userDataSlice = createSlice({
    name: 'userData',
    initialState: INITIAL_STATE,
    reducers: {
        userLogin: (state, action) => {
            state.userDetails = action.payload
        },
        resetState: (state) => {
            state.userDetails = {}
        }
    }
})

export const { userLogin, resetState } = userDataSlice.actions
export default userDataSlice.reducer