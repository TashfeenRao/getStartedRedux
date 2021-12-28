import {configureStore} from '@reduxjs/toolkit'
import postsSlice from "./postsSlice";
import usersSlice from "./usersSlice";
import notificationsSlice from "./notificationsSlice";

export default configureStore({
    reducer:
        {posts: postsSlice,
        users: usersSlice,
        notifications: notificationsSlice,
        }

})