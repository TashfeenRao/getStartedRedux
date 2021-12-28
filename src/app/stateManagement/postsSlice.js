import {createEntityAdapter, createSlice, nanoid} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {client} from "../../api/client";

// const initialState = [{
//     id: '1',
//     title: 'First Post!',
//     authorId: '1',
//     content: 'Hello!',
//     date: sub(new Date(), {minutes: 10}).toISOString(),
//     reactions: {
//         thumbsUp: 0,
//         hooray: 0,
//         heart: 0,
//         rocket: 0,
//         eyes: 0
//     }
// },
//     {
//         id: '2',
//         title: 'Second Post',
//         content: 'More text',
//         authorId: '0',
//         date: sub(new Date(), {minutes: 5}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             hooray: 0,
//             heart: 0,
//             rocket: 0,
//             eyes: 0
//         }
//     }]

// const initialState = {
//     posts: [],
//     status: 'idle',
//     error: null
// }

const postsAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeapi/posts')
    return response.data
})

export const saveNewPostToDb = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await client.post('fakeapi/posts', initialPost)
    return response.data
})

const addPostCreater = (title, content, authorId) => {
    return {
        payload: {
            id: nanoid(),
            title,
            content,
            authorId,
            date: new Date().toISOString()
        }
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload)
            },
            prepare: (title, content, authorId) => addPostCreater(title, content, authorId)
        },
        addPost: (state, action) => {
            state.push(action.payload)
        },
        updatePost: (state, action) => {
            const {id, title, content} = action.payload
            const existingPost = state.entities[id]
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        updateReaction: {
            reducer(state, action) {
                const {postId, name} = action.payload
                const existingPost = state.entities[postId]
                if (existingPost) {
                    existingPost.reactions[name]++
                }
            },
            prepare(postId, name) {
                return {
                    payload: {
                        name,
                        postId
                    }
                }
            }
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'pending'

        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'succeed';
            postsAdapter.upsertMany(state, action.payload)
           // state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

        [saveNewPostToDb.fulfilled]: (state, action) =>  postsAdapter.addOne(state, action.payload)
    }
})

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts)

//export const selectAllPosts = state => state.posts.posts
export const {addPost, postAdded, updatePost, updateReaction} = postsSlice.actions
export default postsSlice.reducer