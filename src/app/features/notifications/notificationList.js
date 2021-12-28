import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {allNotificationRead, selectAllNotification} from "../../stateManagement/notificationsSlice";
import {selectAllUsers} from "../../stateManagement/usersSlice";
import {formatDistanceToNow, parseISO} from "date-fns";
import classNames from "classnames";

const NotificationList = () => {
    const notifications = useSelector(selectAllNotification)
    const dispatch = useDispatch()
    const notificationState = useSelector(state => state.notifications.notificationsStatus)
    const users = useSelector(selectAllUsers)

    useLayoutEffect(() => {
        dispatch(allNotificationRead())
    })



    const renderedNotifications = notifications.map((notification) => {
        const user = users.find((user) => user.id === notification.user) || {
            name: 'unknown user'
        }
        const date = parseISO(notification.date)
        const timeAgo = formatDistanceToNow(date)

        const className = classNames('notification', {
            new: notification.isNew
        })

        return (
            <div key={notification.id} className={className}>
                <div>
                    <b>{user.name}</b> {notification.message}
                    <div title={notification.date}>
                        <i>{timeAgo}</i>
                    </div>
                </div>
            </div>
        )
    })

    if(notificationState === 'pending') return <h2>Loading</h2>

    return (
        <div>
            <h2>Notifications</h2>
            {renderedNotifications}
        </div>
    );
};

export default NotificationList;