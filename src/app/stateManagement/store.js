import {configureStore} from '@reduxjs/toolkit'
import postsSlice from "./postsSlice";
import notificationsSlice from "./notificationsSlice";
import {apiSlice} from "./apiSlice";

export default configureStore({
    reducer:
        {
            posts: postsSlice,
            notifications: notificationsSlice,
            [apiSlice.reducerPath]: apiSlice.reducer
        },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)

})