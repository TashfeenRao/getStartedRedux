import {configureStore} from '@reduxjs/toolkit'
import postsSlice from "./features/postsSlice";

export default configureStore({
    reducer:
        {posts: postsSlice}
})