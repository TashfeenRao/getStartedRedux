import {configureStore} from '@reduxjs/toolkit'
import postsSlice from "./postsSlice";
import usersSlice from "./usersSlice";

export default configureStore({
    reducer:
        {posts: postsSlice,
        users: usersSlice}

})