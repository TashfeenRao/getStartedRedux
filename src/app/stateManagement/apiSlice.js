// Import the RTK Query methods from the React-specific entry point
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with '/fakeApi'
    baseQuery: fetchBaseQuery({baseUrl: '/fakeApi'}),
    tagTypes: ['Post'],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The `getPosts` endpoint is a "query" operation that returns data
        getPosts: builder.query({
            // The URL for the request is '/fakeApi/posts'
            query: () => '/posts',
            providesTags: (result = [], error, args) => ['Post', ...result.map(({id}) => ({type: 'Post', id}))]
        }),
        getPost: builder.query({
            query(postId) {
                return {url: `/posts/${postId}`}
            },
            providesTags: (result = [], error, args) => [{type: 'Post', id: args}]

        }),
        addNewPost: builder.mutation({
            query(newPost) {
                return {url: '/posts', method: 'POST', body: newPost}
            },
            invalidatesTags: ['Post']
        }),
        editPost: builder.mutation({
            query(arg) {
                return {url: `/posts/${arg.id}`, method: 'PATCH', body: arg}
            },
            invalidatesTags: (result = [], error, args) => [{type: 'Post', id: args.id}]
        }),
        getUsers: builder.query({
            query: () => '/users'
        })
    })
})

export const {useGetPostsQuery, useGetPostQuery, useAddNewPostMutation, useEditPostMutation, useGetUsersQuery} = apiSlice