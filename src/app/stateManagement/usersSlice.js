import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";
import {selectAllPosts} from "./postsSlice";


// const initialState = {
//     users: [],
//     status: 'idle',
//     error: null
// }

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await client('/fakeapi/users')
    return response.data
})

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]:  (state) => {
            state.status = 'pending'
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'succeed';
            usersAdapter.upsertMany(state, action.payload)
            //state.users = state.users.concat(action.payload)
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'error';
            state.error = action.payload
        }
    }
})

export default usersSlice.reducer

export const {
    selectAll: selectAllUsers,
    selectIds: selectAllUserIds,
    selectById: selectUser,
} = usersAdapter.getSelectors(state => state.users)

// export const selectAllUsers = state => state.users.users
//
 export const userAllPosts = (state, userId) => {
    const posts = selectAllPosts(state)
    return posts.filter((post) => post.user === userId)
}
//
// export const selectUser = (state, userId) => state.users.users.find((user) => user.id === userId)