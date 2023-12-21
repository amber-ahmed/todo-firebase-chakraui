import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userData } from "../../firebase/models/auth";
const initialState = {
    name: '',
    uid: '',
}

export const getUserAccount = createAsyncThunk(
    'account/getUser',
    async () => {
            const  data = await userData()
            console.log(data)
            return data
    }
)
const accountSlice = createSlice({
    name: "account",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getUserAccount.fulfilled, (state, action) => {
                state.userDetails = action.payload
                state.pending = false
            })
            .addCase(getUserAccount.pending, (state, action) => {
                state.pending = true
            })
            .addCase(getUserAccount.rejected, (state, action) => {
                console.log(action)
                state.pending = false
                state.error = action.error.message
            })
    }
})
export default accountSlice.reducer