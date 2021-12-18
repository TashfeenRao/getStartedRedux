import {createSlice, nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";

const initialState = [{
    id: '1',
    title: 'First Post!',
    authorId: '1',
    content: 'Hello!',
    date: sub(new Date(), {minutes: 10}).toISOString(),
    reactions: {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0
    }
},
    {
        id: '2',
        title: 'Second Post',
        content: 'More text',
        authorId: '0',
        date: sub(new Date(), {minutes: 5}).toISOString(),
        reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
        }
    }]

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
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        updateReaction: {
            reducer(state, action) {
                const {postId, name} = action.payload
                const existingPost = state.find(post => post.id === postId)
                if(existingPost) {
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
    }
})
export const {addPost, postAdded, updatePost, updateReaction} = postsSlice.actions
export default postsSlice.reducer