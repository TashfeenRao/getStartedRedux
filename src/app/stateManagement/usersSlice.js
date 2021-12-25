import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";


const initialState = {
    users: [],
    status: 'idle',
    error: null
}


export const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await client('/fakeapi/users')
    return response.data
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state) => {
            state.status = 'pending'
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'succeed';
            state.users = state.users.concat(action.payload)
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'error';
            state.error = action.payload
        })
    }
})

export default usersSlice.reducer