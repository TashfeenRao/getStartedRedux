import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {client} from "../../api/client";



const notificationAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
    }
)


const initialState = notificationAdapter.getInitialState({
    status: 'idle',
    error: null
})


export const fetchAllNotifications = createAsyncThunk('notifications/fetchallnotification', async(_,{getState}) => {
    const allNotifications = selectAllNotification(getState())
    const [latestNotification] = allNotifications
    const timeStamp = latestNotification ? latestNotification.date : ''

    const response = await client.get(`fakeapi/notifications?since=${timeStamp}`)
    return response.data
})


 const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        allNotificationRead (state, _) {
            Object.values(state.entities).forEach((n) => {
                n.read = true
            })
        }
    },
    extraReducers: {
        [fetchAllNotifications.fulfilled]: (state, action) => {
            notificationAdapter.upsertMany(state, action.payload)
            state.status = 'fulfilled'
            Object.values(state.entities).map((n) => {
                n.isNew = !n.read
            })
        },
        [fetchAllNotifications.pending]: (state, _) => {
            state.status = 'pending'
        }
    }
})

export const {allNotificationRead} = notificationSlice.actions
export default notificationSlice.reducer

export const {selectAll: selectAllNotification} = notificationAdapter.getSelectors(state => state.notifications)

// export const selectAllNotification = (state) => state.notifications.notifications